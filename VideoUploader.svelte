<script>
    import { onMount } from 'svelte';
    import { Button } from 'carbon-components-svelte';
    import Uppy from '@uppy/core';
    import Tus from '@uppy/tus';
    import Dashboard from '@uppy/dashboard';
    
    let uppy;
    
    onMount(() => {
      uppy = new Uppy({
        autoProceed: false,
        restrictions: {
          allowedFileTypes: ['video/*'],
        },
      });
    
      uppy.use(Dashboard, {
        target: '.uppy-dashboard-container',
        inline: true,
        showLinkToFileUploadResult: false,
        browserBackButtonClose: false,
        note: 'Video files only, up to 2 GB',
      });
    
      uppy.use(Tus, {
        endpoint: 'https://tusd.tusdemo.net/files/',
        limit: 2,
      });
    
      uppy.on('complete', (result) => {
        console.log('Upload complete:', result);
      });
    
      return () => {
        uppy.close();
      };
    });
    
    const startUpload = () => {
      uppy.upload().catch((error) => {
        console.error('Error uploading:', error);
      });
    };
  </script>
  
  <style>
    .uppy-dashboard-container {
      max-width: 100%;
      margin-bottom: 1rem;
    }
  </style>
  
  <div class="uppy-dashboard-container"></div>
  <Button on:click={startUpload}>Upload</Button>