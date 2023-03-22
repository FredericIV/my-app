<script lang="ts">
  import VideoUploader from '../components/VideoUploader.svelte';
  /** @type {import('./$types').PageData} */
  import { page } from '$app/stores';
  import {
    Header,
    SideNav,
    SideNavItems,
    SideNavLink,
    SideNavDivider,
    SkipToContent,
    Content,
    Grid,
    Row,
    Column,
    Button,
  } from "carbon-components-svelte";
  import { onMount } from 'svelte';
  import { getUser } from '$lib/auth';
  let user;
  onMount(async () => {
    user = await getUser();
  });
</script>
<Grid>
  <Row>
    <Column>
      {#if user}
        <h1>Welcome, {user.name}!</h1>
        <VideoUploader />
        
      {:else}
        <h1>Welcome. Please sign in.</h1>
      {/if}
    </Column>
  </Row>
</Grid>