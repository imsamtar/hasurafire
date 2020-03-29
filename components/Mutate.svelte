<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { mutate } from "../graphql/actions";

  export let mutation;
  export let every = undefined;
  export let variables = {};

  const dispatch = createEventDispatcher();
  let graphql, promise, response;

  onMount(() => {
    promise = mutate(mutation, variables);
    promise.then(resp => {
      response = resp;
      dispatch("response", resp);
    });
    if (every) {
      setInterval(async () => {
        let resp = await mutate(mutation, variables);
        if (JSON.stringify(response) !== JSON.stringify(resp)) {
          response = resp;
          dispatch("response", resp);
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
      <slot response={response || resp} />
    {:catch error}
      <slot name="error" {error} />
    {/await}
  {:else}
    <slot name="loading" />
  {/if}
{:else}
  You must pass
  <code>mutation</code>
  prop...
{/if}
