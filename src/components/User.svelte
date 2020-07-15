<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { setContext, getContext } from "svelte";
  import { firebase, currentUser } from "../store";
  import { loginStatus, accessToken } from "../store";
  import { signOut } from "../store";
  import { onInterval } from "../utils";

  export let refreshTokenEvery = 1000;
  export let user = undefined;
  export let auth = undefined;
  /********* compoments ***********/
  export let pending = undefined;
  export let component = undefined;
  export let out = undefined;
  /********************************/
  export let fresh_signin = false;
  export let signout = signOut;
  signout = signOut;

  const dispatch = createEventDispatcher();

  let child_of_root = getContext("__root");

  setContext("__user", true);

  function initialize() {
    let interval;
    let firstTime = true;
    $firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        $accessToken = await user.getIdToken(true);
        $currentUser = user;

        interval = setInterval(async function() {
          $accessToken = await user.getIdToken(true);
        }, refreshTokenEvery * 1000);

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
  }

  $: if (child_of_root && $firebase) initialize();

  $: if (typeof window == "object" && child_of_root && $firebase) {
    user = $currentUser;
    auth = $firebase.auth();
  }
</script>

{#if child_of_root && $firebase}
  <!-- always rendered -->
  <slot name="start" />
  {#if $loginStatus == 1}
    <!-- if signed in -->
    {#if component}
      <svelte:component this={component} {user} {auth} {fresh_signin} {signout} />
    {:else}
      <slot {user} {auth} {fresh_signin} {signout} />
    {/if}
    <!----->
  {:else if $loginStatus == -1}
    <!-- if signed out -->
    {#if out}
      <svelte:component this={out} {auth} />
    {:else}
      <slot name="signed-out" {auth} />
    {/if}
    <!----->
  {:else if pending}
    <!-- if pending -->
    <svelte:component this={pending} {auth} />
    <!----->
  {:else}
    <!-- if pending -->
    <slot name="pending" {auth} />
    <!----->
  {/if}
  <!-- always rendered -->
  <slot name="end" />
  <!----->
{:else if !$firebase}
  <p>
    Prop
    <code>firebaseConfig</code>
    not passed to
    <code>Root</code>
    component.
  </p>
{:else}
  <p>
    This component must be a child of
    <code>Root</code>
    component.
  </p>
{/if}
