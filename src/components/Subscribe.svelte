<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { subscribe } from "../graphql";
  import { currentUser } from "../store";

  export let query;
  export let variables = {};
  export let role = "";
  export let headers = {};
  export let noauth = undefined;
  export let adminsecret = undefined;

  const dispatch = createEventDispatcher();
  let graphql, response;

  onMount(() => {
    const options = { role, headers, noauth, adminsecret };
    const { observable, disconnect } = subscribe(query, variables, options);
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
    <slot name="pending" />
  {/if}
  <slot name="*" />
{:else}
  You must pass
  <code>query</code>
  prop...
{/if}
