<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { setContext, getContext } from "svelte";
  import { firebase, currentUser } from "../store";
  import { loginStatus, accessToken } from "../store";
  import { signOut } from "../store";
  import { onInterval } from "../utils";

  export let refreshTokenEvery = 1000;

  const dispatch = createEventDispatcher();
  export let user = undefined;
  export let auth = undefined;
  export let fresh_signin = false;
  export let signout = signOut;
  signout = signOut;

  let child_of_root = getContext("__root");

  setContext("__user", true);
  onMount(function() {
    if (!child_of_root) return;
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
          fresh_signin = true;
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

  $: if (typeof window == "object" && child_of_root) {
    user = $currentUser;
    auth = $firebase.auth();
  }
</script>

{#if child_of_root}
  <slot name="start" />
  {#if $loginStatus == 1}
    <slot {user} {auth} {fresh_signin} {signout} />
  {:else if $loginStatus == -1}
    <slot name="signed-out" {auth} />
  {:else}
    <slot name="pending" {auth} />
  {/if}
  <slot name="end" />
{:else}
  <p>
    This component must be a child of
    <code>Root</code>
    component.
  </p>
{/if}
