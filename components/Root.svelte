<script>
  import { onMount } from "svelte";
  import firebase from "@firebase/app";
  import "@firebase/auth";
  import firebaseStore from "../auth";
  import { serverUri } from "../graphql/store";

  export let firebaseConfig, server;

  onMount(() => {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    $firebaseStore = firebase;
    $serverUri = server;
  });
</script>

{#if $firebaseStore && server}
  <slot {firebase} />
{:else if !firebaseConfig}
  <p>
    Pass firebase configuration as a prop
    <em>config</em>
  </p>
{:else if !server}
  <p>
    Pass hasura server URI as a prop
    <em>server</em>
  </p>
{/if}
