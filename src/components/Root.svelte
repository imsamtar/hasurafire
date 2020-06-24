<script>
  import { onMount, setContext } from "svelte";
  import firebase from "@firebase/app";
  import "@firebase/auth";
  import "@firebase/performance";
  import "@firebase/analytics";
  import { performance } from "../store";
  import { hasuraEndpoint } from "../store";
  import { firebase as _firebase } from "../store";
  import { analytics as _analytics } from "../store";
  import { queries as _queries } from "../store";

  export let firebaseConfig, endpoint;
  export let queries = {};
  export let schema = "";
  export let analytics = false;
  export let perf = false;

  setContext("__root", true);
  onMount(function() {
    if (!firebaseConfig || !endpoint) return;
    if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
    window.firebase = firebase;
    $_analytics = analytics && firebase.analytics();
    $performance = perf && firebase.performance();
    $_firebase = firebase;
    $hasuraEndpoint = endpoint;
    if (typeof queries == "object") {
      for (const key in queries)
        if (typeof queries[key] === "string")
          if (schema) queries[key] = queries[key].replace(/%s/g, schema);
          else queries[key] = queries[key].replace(/%s_?/g, "");
      $_queries = queries;
    }
  });
</script>

{#if $_firebase && endpoint}
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
