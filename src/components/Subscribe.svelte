<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { getContext } from "svelte";
  import { subscribe } from "../graphql";
  import { currentUser, hasuraEndpoint } from "../store";

  export let query;
  export let started = false;
  export let variables = {};
  export let role = "";
  export let headers = {};
  export let noauth = !getContext("__user");
  export let adminsecret = undefined;
  export let response = undefined;
  export let data = undefined;
  export let execute = undefined;
  export let error = undefined;
  /********* compoments ***********/
  export let component = undefined;
  export let pending = undefined;
  export let alt = undefined;
  /********************************/
  error = undefined;
  response = undefined;
  $: data = response && response.data;

  const dispatch = createEventDispatcher();
  let graphql;
  let child_of_root = getContext("__root");

  execute = function() {
    if (!child_of_root || !query || !$hasuraEndpoint) return;
    const options = { role, headers, noauth, adminsecret };
    const { observable, client } = subscribe(query, variables, options);
    const sub = observable.subscribe(
      function(resp) {
        if (noauth || adminsecret || $currentUser) {
          if (resp && resp.data) error = undefined;
          response = resp;
          dispatch("response", resp);
        } else {
          sub.unsubscribe();
          client.close();
        }
      },
      function(err) {
        error = err;
      }
    );
    return function() {
      sub.unsubscribe();
      client.close();
    };
  };

  onMount(function() {
    started && setTimeout(execute, 0);
  });
</script>

{#if child_of_root}
  {#if $hasuraEndpoint}
    {#if query}
      <slot name="start" />
      {#if error}
        <!-- if query fails -->
        {#if alt}
          <svelte:component this={component} {error} />
        {:else}
          <slot name="error" {error} />
        {/if}
        <!----->
      {:else if response}
        <!-- if query successful -->
        {#if component}
          <svelte:component
            this={component}
            {response}
            {data}
            {error}
            {execute} />
        {:else}
          <slot {response} {data} {error} {execute} />
        {/if}
        <!----->
      {:else if pending}
        <!-- if pending -->
        <svelte:component this={pending} />
      {:else}
        <slot name="pending" />
        <!----->
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
      Must provide endpoint prop to
      <code>Root</code>
      component.
    </p>
  {/if}
{:else}
  <p>
    This component must be a child of
    <code>Root</code>
    component.
  </p>
{/if}
