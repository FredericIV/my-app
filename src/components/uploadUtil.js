import { Upload } from "tus-js-client";
import {PUBLIC_TUS_ENDPOINT, PUBLIC_CLOUDFLARE_API_TOKEN} from '$env/static/public';

export async function createTusUpload(file) {
  return new Promise((resolve, reject) => {
    const upload = new Upload(file, {
      endpoint: PUBLIC_TUS_ENDPOINT,
      headers: {
        Authorization: "Bearer " + PUBLIC_CLOUDFLARE_API_TOKEN,
      },
      retryDelays: [0, 1000, 3000, 5000],
      metadata: {
        filename: file.name,
        filetype: file.type,
      },
      onError: (error) => {
        console.error("Failed because: " + error);
        reject(error);
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        const percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
        console.log(bytesUploaded, bytesTotal, percentage + "%");
      },
      onSuccess: () => {
        console.log("Download %s from %s", upload.file.name, upload.url);
        resolve(upload.url);
      },
    });

    upload.start();
  });
}