<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { query as runQuery } from "../graphql/actions";
  import { onInterval } from "../utils";
  import { currentUser } from "../auth";

  export let query;
  export let disableError = undefined;
  export let every = undefined;
  export let variables = {};

  const dispatch = createEventDispatcher();
  let graphql, promise, response, error;

  const areEqual = (obj1, obj2) =>
    JSON.stringify(obj1) === JSON.stringify(obj2);

  onMount(() => {
    promise = runQuery(query, variables);
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
  });
  if (every) {
    onInterval(
      async () => {
        try {
          let resp = await runQuery(query, variables);
          if (resp && resp.data) error = undefined;
          if (JSON.stringify(response) !== JSON.stringify(resp)) {
            response = resp;
            dispatch("response", resp);
          }
        } catch (err) {
          if (!error || !areEqual(error.message, err.message)) {
            error = err;
            dispatch("error", err);
          }
        }
      },
      every * 1000,
      $currentUser
    );
  }
</script>

{#if query}
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
  <code>query</code>
  prop...
{/if}
