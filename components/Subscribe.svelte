<script>
  import { onMount, createEventDispatcher } from "svelte";
  import client from "../graphql";

  export let query;
  export let variables = {};

  const dispatch = createEventDispatcher();
  let graphql, store, response;

  onMount(() => {
    graphql = client();
    store = graphql.subscribe({ query, variables });
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
