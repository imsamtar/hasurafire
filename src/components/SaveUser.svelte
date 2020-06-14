<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { mutate } from "../graphql";
  export let mutation;
  export let variables = {};
  export let role = "";
  export let headers = {};
  export let noauth = undefined;
  export let adminsecret = undefined;
  export let response = undefined;
  export let data = undefined;
  response = undefined;
  $: data = response && response.data;

  const dispatch = createEventDispatcher();
  let exists, error;

  onMount(async () => {
    try {
      const options = { role, headers, noauth, adminsecret };
      response = await mutate(mutation, variables, options);
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
  <slot {response} {data} />
{:else if error}
  {#if exists}
    <slot name="exists" {error} />
  {:else}
    <slot name="error" {error} />
  {/if}
{:else}
  <slot name="pending" />
{/if}
<slot name="*" />
