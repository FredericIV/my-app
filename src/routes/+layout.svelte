<script>
  import "carbon-components-svelte/css/all.css";
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
  /** @type {import('oidc-client-ts').User | null} */
  let user;
  onMount(async () => {
    user = await getUser();
  });
  let isSideNavOpen = false;
</script>
<svelte:head>
  <title>KateProject</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>
<Header company="Kate" platformName="Et al." bind:isSideNavOpen>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
</Header>
  
<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    {#if user}
      <SideNavLink text="Hi {user.profile.given_name}!" />
      <SideNavLink on:click={logout} href="" text="Logout" />
    {:else}
      <SideNavLink on:click={login} href="" text="Login" />
    {/if}
    <SideNavDivider />
    <SideNavLink href="/" text="Home" />
    <SideNavLink href="/submitter/upload" text="Upload" />
  </SideNavItems>
</SideNav>

<Content>
    <slot />
</Content>