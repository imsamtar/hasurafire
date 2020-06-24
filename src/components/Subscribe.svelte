<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { getContext } from "svelte";
  import { subscribe } from "../graphql";
  import { currentUser } from "../store";

  export let query;
  export let variables = {};
  export let role = "";
  export let headers = {};
  export let noauth = !getContext("__user");
  export let adminsecret = undefined;
  export let response = undefined;
  export let data = undefined;
  export let error = undefined;
  error = undefined;
  response = undefined;
  $: data = response && response.data;

  const dispatch = createEventDispatcher();
  let graphql;
  let child_of_root = getContext("__root");

  onMount(function() {
    if (!child_of_root || !query) return;
    const options = { role, headers, noauth, adminsecret };
    const { observable, client } = subscribe(query, variables, options);
    const sub = observable.subscribe(
      resp => {
        if (noauth || adminsecret || $currentUser) {
          if (resp && resp.data) error = undefined;
          response = resp;
          dispatch("response", resp);
        } else {
          sub.unsubscribe();
          client.close();
        }
      },
      err => (error = err)
    );
    return () => {
      sub.unsubscribe();
      client.close();
    };
  });
</script>

{#if child_of_root}
  {#if query}
    <slot name="start" />
    {#if error}
      <slot name="error" {error} />
    {:else if response}
      <slot {response} {data} {error} />
    {:else}
      <slot name="pending" />
    {/if}
    <slot name="end" />
  {:else}
    <p>
      Prop
      <code>query</code>
      is required.
    </p>
  {/if}
{:else}
  <p>
    This component must be a child of
    <code>Root</code>
    component.
  </p>
{/if}
