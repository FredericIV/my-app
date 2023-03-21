<script lang="ts">
  import { Uppy, Dashboard } from '@uppy/svelte';
  import XHRUpload from '@uppy/xhr-upload';

  const uppy = new Uppy({
    autoProceed: true,
    restrictions: {
      allowedFileTypes: ['video/*']
    }
  });

  uppy.use(XHRUpload, {
    endpoint: '/api/upload',
    fieldName: 'file'
  });
</script>

<Dashboard uppy={uppy} />