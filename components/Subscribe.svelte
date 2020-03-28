<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { subscribe } from "../graphql/actions";

  export let query;
  export let variables = {};

  const dispatch = createEventDispatcher();
  let graphql, store, response;

  onMount(() => {
    store = subscribe(query, variables);
  });

  $: if (store && $store) {
    response = $store;
    dispatch("update", $store);
  }
</script>

{#if query}
  {#if store && $store}
    <slot {response} />
  {:else}
    <slot name="loading" />
  {/if}
{:else}
  You must pass
  <code>query</code>
  prop...
{/if}
