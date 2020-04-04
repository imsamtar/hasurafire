<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { mutate } from "../graphql/actions";
  import { onInterval } from "../utils";
  import { currentUser } from "../auth";

  export let mutation;
  export let every = false;
  export let started = !!every;
  export let variables = {};

  const dispatch = createEventDispatcher();
  let graphql, response, error;

  const areEqual = (obj1, obj2) =>
    JSON.stringify(obj1) === JSON.stringify(obj2);

  const execute = async () => {
    try {
      let resp = await mutate(mutation, variables);
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

  onMount(started ? execute : () => {});
  if (every) onInterval(execute, every * 1000, currentUser);
</script>

{#if mutation}
  {#if error}
    <slot name="error" {error} />
  {:else if response}
    <slot {response} {error} {execute} />
  {:else}
    <slot name="loading" />
  {/if}
{:else}
  You must pass
  <code>mutation</code>
  prop...
{/if}
