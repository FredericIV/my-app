<script lang="ts">
  import type { User } from 'oidc-client-ts';
  import { onMount } from 'svelte';
  import { getUser } from '$lib/auth';
  import {
    Grid,
    Row,
    Column,
    ProgressIndicator,
    ProgressStep,
  } from "carbon-components-svelte";
  import VideoUploader from '$lib/VideoUploader.svelte';

  let user: User | null;
  onMount(async () => {
    user = await getUser();
  });
  let index = 0;
  let track = {
    Upload: {
      complete: false,
      current: false,
      label: "Upload",
    },
    Detail: {
      complete: false,
      current: false,
      label: "Detail",
    },
    Review: {
      complete: false,
      current: false,
      label: "Review",
    }
  }
  function progress() {
    index += 1;
    if (index === 1) {
      track.Upload.complete = true;
      track.Upload.current = false;
      track.Detail.current = true;
    } else if (index === 2) {
      track.Detail.complete = true;
      track.Detail.current = false;
      track.Review.current = true;
    } else if (index === 3) {
      track.Review.complete = true;
      track.Review.current = false;
    }
  }
</script>
<Grid>
  <Row>
    <Column>
      {#if user}
        <h1>Welcome, {user.profile.name}!</h1>
        <ProgressIndicator bind:currentIndex={index} preventChangeOnClick={true}>
          <ProgressStep {...track.Upload}  />
          <ProgressStep {...track.Detail} />
          <ProgressStep {...track.Review} />
        </ProgressIndicator>
        {#if index === 0}
          <VideoUploader on:onComplete={progress}/>
        {:else if index === 1}
          <h1>Metadata</h1>
        {:else if index === 2}
          <h1>Review</h1>
        {/if}
      {:else}
        <h1>Welcome. Please sign in.</h1>
      {/if}
    </Column>
  </Row>
</Grid>