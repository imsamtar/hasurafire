import { onDestroy } from "svelte";

export function onInterval(callback, milliseconds, condition) {
  const interval = setInterval(() => {
    if (!condition) return clearInterval(interval);
    return callback();
  }, milliseconds);
  onDestroy(() => {
    return clearInterval(interval);
  });
}
