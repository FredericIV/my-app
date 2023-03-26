<script lang="ts">
    import { onMount } from 'svelte';
    import { callback } from '$lib/auth';
	  import { goto } from '$app/navigation';
  
    onMount(async () => {
      try {
        await callback();
        goto('/', { replaceState: false });
      } catch (error) {
        console.error('Callback error:', error);
        // Handle error, e.g., display an error message or redirect to an error page
      }
    });
  </script>
  
  <p>Processing...</p>