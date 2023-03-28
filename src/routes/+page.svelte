<script lang="ts">
  import type { User } from 'oidc-client-ts';
  import {
    Grid,
    Row,
    Column,
    Content,
    Link,
  } from "carbon-components-svelte";
  import { getContext } from 'svelte';
  let user = getContext('user') as User;
</script>
<Grid>
  <Row>
    <Column>
      {#if $user}
        <h1>Welcome, {$user.profile.given_name}!</h1>
        <Content>
          <Link href="/submitter">
            Click here to upload a video.
          </Link>
        </Content>

      {:else}
        <h1>Welcome, please sign in.</h1>
      {/if}
    </Column>
  </Row>
</Grid>