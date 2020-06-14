<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { getContext } from "svelte";
  import { subscribe } from "../graphql";
  import { currentUser } from "../store";

  export let query;
  export let variables = {};
  export let role = "";
  export let headers = {};
  export let noauth = undefined;
  export let adminsecret = undefined;
  export let response = undefined;
  export let data = undefined;
  response = undefined;
  $: data = response && response.data;

  const dispatch = createEventDispatcher();
  let graphql;

  onMount(() => {
    const is_child_of_user = getContext("__user");
    const options = { role, headers, noauth, adminsecret };
    const { observable, disconnect } = subscribe(query, variables, options);
    const sub = observable.subscribe(resp => {
      if ($currentUser || noauth || adminsecret || !is_child_of_user) {
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
    <slot {response} {data} />
  {:else}
    <slot name="pending" />
  {/if}
  <slot name="*" />
{:else}
  You must pass
  <code>query</code>
  prop...
{/if}
