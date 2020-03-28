<script>
  import { onMount } from "svelte";
  import firebase, { currentUser, loginStatus } from "../auth";

  let user, auth;

  onMount(() => {
    $firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        localStorage.setItem("token", await user.getIdToken(true));
        $currentUser = user;
        $loginStatus = 1;
      } else {
        $currentUser = 0;
        $loginStatus = -1;
        localStorage.removeItem("token");
      }
    });
    auth = $firebase.auth();
  });

  $: if (typeof window == "object") {
    user = $currentUser;
    auth = $firebase.auth();
  }
</script>

{#if $firebase}
  {#if $loginStatus == 1}
    <slot {user} {auth} />
  {:else if $loginStatus == -1}
    <slot name="signed-out" {auth} />
  {:else}
    <slot name="loading" {auth} />
  {/if}
{:else}
  You must use
  <code>Root</code>
  component...
{/if}
