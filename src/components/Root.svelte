<script>
  import { onMount, setContext } from "svelte";
  import firebase from "@firebase/app";
  import "@firebase/auth";
  import "@firebase/performance";
  import "@firebase/analytics";
  import {
    firebase as firebaseStore,
    analytics as analyticsStore,
    performance,
    queries as queriesStore,
    hasuraEndpoint
  } from "../store";

  export let firebaseConfig, endpoint;
  export let queries = {};
  export let analytics = false;
  export let perf = false;
  export let schema = "";

  setContext("__root", true);
  onMount(() => {
    if (!firebaseConfig || !endpoint) return;
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    window.firebase = firebase;
    $analyticsStore = analytics && firebase.analytics();
    $performance = perf && firebase.performance();
    $firebaseStore = firebase;
    $hasuraEndpoint = endpoint;
    if (typeof queries == "object") {
      for (const key in queries)
        if (typeof queries[key] === "string")
          if (schema) queries[key] = queries[key].replace(/%s/g, schema);
          else queries[key] = queries[key].replace(/%s_?/g, "");
      $queriesStore = queries;
    }
  });
</script>

{#if $firebaseStore && endpoint}
  <slot {firebase} />
{:else if !firebaseConfig}
  <p>
    Prop
    <code>firebaseConfig</code>
    is required.
  </p>
{:else if !endpoint}
  <p>
    Prop
    <code>endpoint</code>
    is required.
  </p>
{/if}
