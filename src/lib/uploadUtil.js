import { Upload } from "tus-js-client";
import { writable } from "svelte/store";
export const TusUploaded= writable(0);
export const TusTotal= writable(100);

export async function createTusUpload(file) {
  return new Promise((resolve, reject) => {
    const upload = new Upload(file, {
      endpoint: '/api/get-upload-url',
      retryDelays: [0, 1000, 3000, 5000],
      metadata: {
        name: file.name,
        filetype: file.type,
        requiresignedurls: 'true',
        maxDurationSeconds: '7200',
      },
      chunkSize: 209715200,
      onError: (error) => {
        console.error("Failed because: " + error);
        reject(error);
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        TusUploaded.set(bytesUploaded);
        TusTotal.set(bytesTotal);
      },
      onSuccess: () => {
        console.log("Download %s from %s", upload.file.name, upload.url);
        console.log(upload);
        resolve(upload.url);
      },
    });

    upload.findPreviousUploads().then(function (previousUploads) {
      // Found previous uploads so we select the first one.
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0])
      }
  
      // Start the upload
      upload.start()
    })
  });
}