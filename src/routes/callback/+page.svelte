<script lang="ts">
    import { onMount } from 'svelte';
    import { callback } from '$lib/auth';
	  import { PUBLIC_OIDC_HOST } from '$env/static/public';
  
    onMount(async () => {
      try {
        await callback();
        window.location=PUBLIC_OIDC_HOST;
      } catch (error) {
        console.error('Callback error:', error);
        // Handle error, e.g., display an error message or redirect to an error page
      }
    });
  </script>
  
  <p>Processing...</p>