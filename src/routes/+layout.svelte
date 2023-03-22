<script>
  import "carbon-components-svelte/css/all.css";
  import "uppy/dist/uppy.min.css";
  import { onMount } from 'svelte';
  import { login, logout, getUser } from '$lib/auth';
  import {
    Header,
    SideNav,
    SideNavItems,
    SideNavLink,
    SideNavDivider,
    SkipToContent,
    Content,
  } from "carbon-components-svelte";
  let user;
  onMount(async () => {
    user = await getUser();
  });
  let isSideNavOpen = false;
</script>
<Header company="Kate" platformName="Et al." bind:isSideNavOpen>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
</Header>
  
<SideNav bind:isOpen={isSideNavOpen}>
<SideNavItems>
  {#if user}
    <SideNavLink on:click={logout} text="Logout" />
  {:else}
    <SideNavLink on:click={login} text="Login" />
  {/if}
  <SideNavDivider />
  <SideNavLink href="http://localhost:4000" text="Home" />
</SideNavItems>
</SideNav>

<Content>
    <slot />
</Content>