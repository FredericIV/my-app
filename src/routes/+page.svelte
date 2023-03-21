<script lang="ts">
    import { onMount } from 'svelte';
    import { login, logout, getUser } from '$lib/auth';
    import VideoUploader from '../components/VideoUploader.svelte';
    import { Button } from 'carbon-components-svelte';
  
    let user;
  
    onMount(async () => {
      user = await getUser();
    });
</script>
  
  {#if user}
    <Button on:click={logout}>Logout</Button>
    <VideoUploader />
  {:else}
    <Button on:click={login}>Login</Button>
  {/if}