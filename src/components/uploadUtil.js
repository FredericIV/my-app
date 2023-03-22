import { Upload } from "tus-js-client";

const TUS_ENDPOINT = "https://api.cloudflare.com/client/v4/accounts/ab21e0d3a64b15eb8cd9ecbd29154427/stream"; // Replace this with your tus server endpoint

export async function createTusUpload(file) {
  return new Promise((resolve, reject) => {
    const upload = new Upload(file, {
      endpoint: TUS_ENDPOINT,
      headers: {
        Authorization: "Bearer " + "sbmJS40AbXB8PwZi9heUiMqnPUHelLTVg1_IfJX3",
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