<script>
  import { onMount, getContext, createEventDispatcher } from "svelte";
  import { mutate } from "../graphql";
  export let mutation;
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
  let already_exists;
  let child_of_root = getContext("__root");

  onMount(async () => {
    if (!child_of_root || !mutation) return;
    try {
      const options = { role, headers, noauth, adminsecret };
      response = await mutate(mutation, variables, options);
      dispatch("new", response);
    } catch (err) {
      let already_exists = err.message.indexOf("niqueness") > -1;
      if (already_exists) dispatch("already_exists", err);
      else dispatch("error", err);
      error = err;
    }
  });
</script>

{#if child_of_root}
  {#if response}
    <slot {response} {data} />
  {:else if error}
    {#if already_exists}
      <slot name="already_exists" {error} />
    {:else}
      <slot name="error" {error} />
    {/if}
  {:else}
    <slot name="pending" />
  {/if}
  <slot name="*" />
{:else}
  <p>
    This component must be a child of
    <code>Root</code>
    component.
  </p>
{/if}
