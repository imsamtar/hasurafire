import { writable } from "svelte/store";

export let analytics = writable(0);

export let performance = writable(0);
