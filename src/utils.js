import { onDestroy } from "svelte";

export function onInterval(callback, milliseconds, condition) {
  const interval = setInterval(() => {
    if (!readStore(condition)) return clearInterval(interval);
    return callback();
  }, milliseconds);
  onDestroy(() => {
    return clearInterval(interval);
  });
}

export function readStore(store) {
  if (typeof store !== "object") return store;
  let temp;
  store.subscribe((data) => (temp = data))();
  return temp;
}
