<script>
  import { onMount, createEventDispatcher } from "svelte";
  import client from "../graphql";

  export let query;
  export let variables = {};

  const dispatch = createEventDispatcher();
  let graphql, promise;

  onMount(() => {
    graphql = client();
    promise = graphql.query({ query, variables });
    promise.then(data => {
      dispatch("response", data);
    });
  });
</script>

{#if query}
  {#if promise}
    {#await promise}
      <slot name="loading" />
    {:then response}
      <slot {response} />
    {:catch error}
      <slot name="error" {error} />
    {/await}
  {:else}
    <slot name="loading" />
  {/if}
{:else}
  You must pass
  <code>query</code>
  prop...
{/if}
