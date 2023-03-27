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
        reject(error);
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        TusUploaded.set(bytesUploaded);
        TusTotal.set(bytesTotal);
      },
      onSuccess: () => {
        resolve(upload.url);
      },
      onAfterResponse: function (req, res) {
        if (res.getHeader('stream-media-id')){
          console.log(res.getHeader('stream-media-id'));
        }
      }
    });
    upload.findPreviousUploads().then(function (previousUploads) {
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0])
      }
      upload.start()
    })
  });
}