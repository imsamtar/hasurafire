<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { mutate } from "../graphql/actions";

  export let mutation;
  export let disableError = undefined;
  export let every = undefined;
  export let variables = {};

  const dispatch = createEventDispatcher();
  let graphql, promise, response, error;

  const areEqual = (obj1, obj2) =>
    JSON.stringify(obj1) === JSON.stringify(obj2);

  onMount(() => {
    promise = mutate(mutation, variables);
    promise
      .then(resp => {
        response = resp;
        dispatch("response", resp);
      })
      .catch(err => {
        if (!error || !areEqual(error.message, err.message)) {
          error = err;
          dispatch("error", err);
        }
      });
    if (every) {
      setInterval(async () => {
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
      }, every * 1000);
    }
  });
</script>

{#if mutation}
  {#if promise}
    {#await promise}
      <slot name="loading" />
    {:then resp}
      {#if !disableError && error}
        <slot name="error" {error} />
      {:else}
        <slot response={response || resp} />
      {/if}
    {:catch err}
      <slot name="error" error={error || err} />
    {/await}
  {:else}
    <slot name="loading" />
  {/if}
{:else}
  You must pass
  <code>mutation</code>
  prop...
{/if}
