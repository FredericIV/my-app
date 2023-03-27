<script lang="ts">
  import type { User } from 'oidc-client-ts';
  import {
    Grid,
    Row,
    Column,
    Content,
    Link,
  } from "carbon-components-svelte";
  import { onMount } from 'svelte';
  import { getUser } from '$lib/auth';
  let user: User | null;
  onMount(async () => {
    user = await getUser();
  });
</script>
<Grid>
  <Row>
    <Column>
      {#if user}
        <h1>Welcome, {user.profile.name}!</h1>
        <Content>
          <Link href="/submitter/upload">
            Click here to upload a video.
          </Link>
        </Content>
        
      {:else}
        <h1>Welcome. Please sign in.</h1>
      {/if}
    </Column>
  </Row>
</Grid>