# Introduction

Welcome to the EsImage tool documentation!

## What Is EsImage

EsImage Tool is a simple and efficient image uploading solution for Next.js projects. It provides seamless integration for handling image uploads, making it easier to manage and store images in your application.

## Main Feature

| Feature        | Description                               |
| -------------- | ----------------------------------------- | --- |
| Upload Support | Supports various image formats.           |     |
| Customizable   | Allows customization based on your needs. |

## Installation

```bash
npm install es-image-upload
```

## Usage

Here's an example of how to use the es-image-upload tool in your project

In this tool you can upload single image and multiple image

- Upload Single Image
  Firstly, you must import the tool to proceed

```js
//Import the EsImage upload tool
import { uploadSingleImage } from "es-image-upload";
```

Next, you'll need to create a handler function and implement an image selection option

```js
"use client";
import { useState } from "react";
import { uploadSingleImage } from "es-image-upload";
export default function SubmitImage() {
  function handleChangeAvatar(e) {
    const file = e.target.files?.[0];
  }
  return (
    <form>
      <input type="file" onChange={handleChangeAvatar} />
      <button>Submit</button>
    </form>
  );
}
```

Next, you will need to convert the image to base64 format and store it in a state

```js
"use client";
import { useState } from "react";
import { uploadSingleImage } from "es-image-upload";
export default function SubmitImage() {
  const [image, setImage] = useState("");
  function handleChangeAvatar(e) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  return (
    <form>
      <input type="file" onChange={handleChangeAvatar} />
      <button>Submit</button>
    </form>
  );
}
```

Finally, you will need to add a form handler and call the `uploadSingleImage` function, passing the image as a parameter for upload.

```js
"use client";
import { useState } from "react";
import { uploadSingleImage } from "es-image-upload";
export default function SubmitImage() {
  const [image, setImage] = useState("");
  function handleChangeAvatar(e) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await uploadSingleImage(image);
    console.log(response);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChangeAvatar} />
      <button>Submit</button>
    </form>
  );
}
```

Additionally, should you wish to upload multiple images, you can substitute the `uploadSingleImage` function with `uploadMultipleImage`, providing an array of images as the parameter for a seamless upload experience.

Like this:

```js
const response = await uploadMultipleImage([image]);
```

And you will receive the response as

```js
  {
    ok: true,
    message: 'Image uploaded successfully',
    file: '/uploads/1738342964728.jpeg'
  }
```

Thank you for using es-image-upload! We hope it makes your development process smoother. If you have any questions, feel free to reach out. Happy coding! 😊

# Contact

For any inquiries or support, feel free to reach out to us at: rakibkhanshamim790@example.com
