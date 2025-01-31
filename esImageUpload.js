"use server";
import { promises as fs } from "fs";
import path from "path";

// Upload directory
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

// Ensure upload directory exists
async function ensureUploadDirExists() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true }).catch(() => {}); // Ignore errors if it already exists
}

// Helper function to save a Base64 image
async function saveBase64Image(base64Image, index = "") {
  const match = base64Image.match(
    /^data:image\/(png|jpeg|jpg|gif);base64,(.+)$/
  );
  if (!match) throw new Error(`Invalid image format at index ${index}`);

  const ext = match[1]; // Extract file extension
  const base64Data = match[2]; // Extract Base64 data
  const fileName = `${Date.now()}${index ? `-${index}` : ""}.${ext}`; // Unique filename
  const filePath = path.join(UPLOAD_DIR, fileName); // Full file path

  // Write the file to the filesystem
  await fs.writeFile(filePath, base64Data, "base64");

  return `/uploads/${fileName}`; // Return file URL
}

// Handle single image upload
export async function uploadSingleImage(image) {
  try {
    await ensureUploadDirExists(); // Ensure upload directory exists
    if (!image || typeof image !== "string")
      throw new Error("Invalid image format");

    const fileUrl = await saveBase64Image(image); // Save the image

    return {
      ok: true,
      message: "Image uploaded successfully",
      file: fileUrl,
    };
  } catch (error) {
    return { error: true, message: error.message, ok: false };
  }
}

// Handle multiple image uploads
export async function uploadMultipleImage(images) {
  try {
    await ensureUploadDirExists(); // Ensure upload directory exists
    if (!images || !Array.isArray(images) || images.length === 0)
      throw new Error("Invalid images format");

    const savedImages = await Promise.all(
      images.map((image, index) => saveBase64Image(image, index))
    );

    return {
      ok: true,
      message: "Images uploaded successfully",
      files: savedImages,
    };
  } catch (error) {
    return { error: true, message: error.message, ok: false };
  }
}
