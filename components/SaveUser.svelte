<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { mutate } from "../graphql/actions";
  export let mutation;
  export let variables = {};

  const dispatch = createEventDispatcher();
  let response, exists, error;

  onMount(async () => {
    try {
      response = await mutate(mutation, variables);
      dispatch("new", response);
    } catch (err) {
      let exists = err.message.indexOf("niqueness") > -1;
      if (exists) dispatch("exists", err);
      else dispatch("error", err);
      error = err;
    }
  });
</script>

{#if response}
  <slot {response} />
{:else if error}
  {#if exists}
    <slot name="exists" {error} />
  {:else}
    <slot name="error" {error} />
  {/if}
{:else}
  <slot name="creating" />
{/if}
