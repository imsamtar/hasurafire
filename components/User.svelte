<script>
  import { onMount, createEventDispatcher } from "svelte";
  import firebase, { currentUser, loginStatus } from "../auth";

  const dispatch = createEventDispatcher();
  let user, auth;

  onMount(() => {
    let firstTime = true;
    $firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        localStorage.setItem("token", await user.getIdToken(true));
        $currentUser = user;
        $loginStatus = 1;
        if (!firstTime) dispatch("signin", user);
        dispatch("in", user);
      } else {
        $currentUser = 0;
        $loginStatus = -1;
        localStorage.removeItem("token");
        if (!firstTime) dispatch("signout", user);
        dispatch("out", user);
      }
      firstTime = false;
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
