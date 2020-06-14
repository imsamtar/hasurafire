<script>
  import { onMount, getContext, createEventDispatcher } from "svelte";
  import { query as runQuery } from "../graphql";
  import { onInterval } from "../utils";
  import { currentUser } from "../store";

  export let query;
  export let every = false;
  export let started = !!every;
  export let variables = {};
  export let role = "";
  export let headers = {};
  export let noauth = undefined;
  export let adminsecret = undefined;
  export let response = undefined;
  export let data = undefined;
  export let error = undefined;
  error = undefined;
  response = undefined;
  $: data = response && response.data;

  const dispatch = createEventDispatcher();
  let graphql;

  const areEqual = (obj1, obj2) =>
    JSON.stringify(obj1) === JSON.stringify(obj2);

  const execute = async () => {
    try {
      const options = { role, headers, noauth, adminsecret };
      let resp = await runQuery(query, variables, options);
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
  if (every)
    onInterval(
      execute,
      every * 1000,
      noauth || adminsecret || !getContext("__user") || currentUser
    );
</script>

{#if query}
  {#if error}
    <slot name="error" {error} />
  {:else if response}
    <slot {response} {data} {error} {execute} />
  {:else}
    <slot name="pending" />
  {/if}
  <slot name="*" />
{:else}
  You must pass
  <code>query</code>
  prop...
{/if}
