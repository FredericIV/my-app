<script>
  import "carbon-components-svelte/css/all.css";
  import { onMount, setContext } from 'svelte';
  import { writable } from 'svelte/store';
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
  const user = writable();
  onMount(async () => {
    user.set(await getUser());
  });
  setContext('user', user)
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
    {#if $user}
      <SideNavLink text="{$user.profile.name}" />
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