<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { subscribe } from "../graphql/actions";
  import { currentUser } from "../auth";

  export let query;
  export let variables = {};

  const dispatch = createEventDispatcher();
  let graphql, subscription, response;

  onMount(() => {
    subscription = subscribe(query, variables).subscribe(resp => {
      if ($currentUser) {
        response = resp;
        dispatch("response", resp);
      } else subscription.unsubscribe();
    });
  });

  onDestroy(() => {
    subscription.unsubscribe();
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
