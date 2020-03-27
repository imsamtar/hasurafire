<script>
  import { onMount } from "svelte";
  import firebase from "@firebase/app";
  import "@firebase/auth";
  import firebaseStore from "./auth";

  export let firebaseConfig;

  onMount(() => {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    $firebaseStore = firebase;
  });
</script>

{#if $firebaseStore}
  <slot {firebase} />
{:else if !firebaseConfig}
  <p>
    Pass firebase configuration as a prop called
    <em>config</em>
  </p>
{/if}
