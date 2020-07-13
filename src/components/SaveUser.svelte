<script>
  import { onMount, getContext, createEventDispatcher } from "svelte";
  import { mutate } from "../graphql";
  import { hasuraEndpoint } from "../store";

  export let mutation;
  export let variables = {};
  export let role = "";
  export let headers = {};
  export let noauth = !getContext("__user");
  export let adminsecret = undefined;
  export let response = undefined;
  export let data = undefined;
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
  let already_exists;
  let child_of_root = getContext("__root");

  onMount(async function() {
    if (!child_of_root || !mutation || !$hasuraEndpoint) return;
    try {
      const options = { role, headers, noauth, adminsecret };
      response = await mutate(mutation, variables, options);
      dispatch("new", response);
    } catch (err) {
      already_exists = /uniqueness/i.test(err.message);
      if (already_exists) dispatch("already_exists", err);
      else dispatch("error", err);
      error = err;
    }
  });
</script>

{#if child_of_root}
  {#if $hasuraEndpoint}
    <slot name="start" />
    {#if response}
      <!-- if saved successfully -->
      {#if component}
        <svelte:component this={component} {response} {data} {error} />
      {:else}
        <slot {response} {data} />
      {/if}
      <!----->
    {:else if error}
      <!-- if mutation fails -->
      {#if alt}
        <svelte:component this={alt} {error} {already_exists} />
      {:else if already_exists}
        <slot name="already_exists" {error} />
      {:else}
        <slot name="error" {error} />
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
