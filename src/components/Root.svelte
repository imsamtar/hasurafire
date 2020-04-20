<script>
  import { onMount } from "svelte";
  import firebase from "@firebase/app";
  import "@firebase/auth";
  import "@firebase/performance";
  import "@firebase/analytics";
  import {
    firebase as firebaseStore,
    analytics as analyticsStore,
    performance,
    queries as queriesStore,
    serverUri
  } from "../store";

  export let firebaseConfig, server;
  export let queries = {};
  export let analytics = false;
  export let perf = false;

  onMount(() => {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    window.firebase = firebase;
    $analyticsStore = analytics && firebase.analytics();
    $performance = perf && firebase.performance();
    $firebaseStore = firebase;
    $serverUri = server;
    if (typeof queries == "object") $queriesStore = queries;
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
