<script>
  import { onMount, getContext, createEventDispatcher } from "svelte";
  import { mutate } from "../graphql";
  import { onInterval } from "../utils";
  import { currentUser, hasuraEndpoint } from "../store";

  export let mutation;
  export let every = false;
  export let started = !!every;
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

  function areEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  execute = async function() {
    if (!child_of_root || !mutation || !$hasuraEndpoint) return;
    try {
      const options = { role, headers, noauth, adminsecret };
      let resp = await mutate(mutation, variables, options);
      if (resp && resp.data) error = undefined;
      if (!areEqual(response, resp)) {
        response = resp;
        dispatch("response", resp);
      }
    } catch (err) {
      if (!error || !areEqual(error.message, err.message)) {
        error = err;
        dispatch("error", err);
      }
    }
  };

  onMount(function() {
    started && setTimeout(execute, 0);
  });

  if (every)
    onInterval(execute, every * 1000, noauth || adminsecret || currentUser);
</script>

{#if child_of_root}
  {#if $hasuraEndpoint}
    {#if mutation}
      <slot name="start" />
      {#if error}
        <!-- if mutation fails -->
        {#if alt}
          <svelte:component this={alt} {error} />
        {:else}
          <slot name="error" {error} />
        {/if}
        <!----->
      {:else if response}
        <!-- if mutation successful -->
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
        <code>mutation</code>
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
