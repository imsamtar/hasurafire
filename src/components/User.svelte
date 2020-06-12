<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { firebase, currentUser, loginStatus, accessToken } from "../store";
  import { onInterval } from "../utils";

  export let refreshTokenEvery = 1000;

  const dispatch = createEventDispatcher();
  let user, auth;
  let needToSave = false;

  onMount(() => {
    let interval;
    let firstTime = true;
    $firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        $accessToken = await user.getIdToken(true);
        $currentUser = user;
        interval = setInterval(
          async () => ($accessToken = await user.getIdToken(true)),
          refreshTokenEvery * 1000
        );
        $loginStatus = 1;
        if (!firstTime) {
          dispatch("signin", user);
          needToSave = true;
        }
        dispatch("in", user);
      } else {
        $currentUser = 0;
        $loginStatus = -1;
        clearInterval(interval);
        $accessToken = "";
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
    <slot {user} {auth} {needToSave} />
  {:else if $loginStatus == -1}
    <slot name="signed-out" {auth} />
  {:else}
    <slot name="pending" {auth} />
  {/if}
  <slot name="*" />
{:else}
  You must use
  <code>Root</code>
  component...
{/if}
