<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { subscribe } from "../graphql";
  import { currentUser } from "../store";

  export let query;
  export let variables = {};

  const dispatch = createEventDispatcher();
  let graphql, response;

  onMount(() => {
    const { observable, disconnect } = subscribe(query, variables);
    const sub = observable.subscribe(resp => {
      if ($currentUser) {
        response = resp;
        dispatch("response", resp);
      } else sub.unsubscribe();
    });
    return () => {
      sub.unsubscribe();
      disconnect();
    };
  });
</script>

{#if query}
  {#if response}
    <slot {response} />
  {:else}
    <slot name="loading" />
  {/if}
{:else}
  You must pass
  <code>query</code>
  prop...
{/if}
