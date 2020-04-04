import { onDestroy } from "svelte";

export function onInterval(callback, milliseconds, condition) {
  const interval = setInterval(() => {
    let cond = condition;
    if (typeof condition.subscribe === "function")
      condition.subscribe((c) => (cond = c))();
    if (!cond) return clearInterval(interval);
    return callback();
  }, milliseconds);
  onDestroy(() => {
    return clearInterval(interval);
  });
}
