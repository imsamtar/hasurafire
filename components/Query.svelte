<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { query as runQuery } from "../graphql/actions";

  export let query;
  export let variables = {};

  const dispatch = createEventDispatcher();
  let graphql, promise;

  onMount(() => {
    promise = runQuery(query, variables);
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
