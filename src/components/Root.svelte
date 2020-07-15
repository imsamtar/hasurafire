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
  import { global as globalStore } from "../store";

  export let endpoint = undefined;
  export let firebaseConfig = undefined;
  export let queries = {};
  export let schema = "";
  export let analytics = false;
  export let perf = false;

  /* while quering (or mutating) if a variable is missing from variables prop,
   * it will be taken from global varaibles passes to Root component as global. */
  export let global = {};
  /********* compoments ***********/
  export let component = undefined;
  /********************************/

  setContext("__root", true);
  onMount(function() {
    if (endpoint) {
      $hasuraEndpoint = endpoint;
      if (typeof queries == "object") {
        for (const key in queries)
          if (typeof queries[key] === "string")
            if (schema) queries[key] = queries[key].replace(/%s/g, schema);
            else queries[key] = queries[key].replace(/%s_?/g, "");
        $_queries = queries;
      }
    }
    if (firebaseConfig) {
      if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
      $_firebase = firebase;
      window.firebase = firebase;
      $_analytics = analytics && firebase.analytics();
      $performance = perf && firebase.performance();
    }
  });

  /* Reactive statement to update global store whenever update in global prop */
  $: if (typeof global === "object" && global !== null) {
    $globalStore = { ...$globalStore, ...global };
  }
</script>

{#if component}
  <svelte:component this={component} {firebase} />
{:else}
  <slot {firebase} />
{/if}
