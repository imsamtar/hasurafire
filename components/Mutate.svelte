<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { mutate } from "../graphql/actions";

  export let mutation;
  export let variables = {};

  const dispatch = createEventDispatcher();
  let graphql, promise;

  onMount(() => {
    promise = mutate(mutation, variables);
    promise.then(data => {
      dispatch("response", data);
    });
  });
</script>

{#if mutation}
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
  <code>mutation</code>
  prop...
{/if}
