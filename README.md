
## Hasurafire

A svelte components library for firebase-auth and hasura

### Setup

```
npm i -D hasurafire
```

### Example

```html
<script>
  import { Root, User } from "hasurafire";
  import { signInWithGoogle } from "hasurafire/auth";
  let firebaseConfig = {
    apiKey: "********",
    authDomain: "********",
    databaseURL: "********",
    projectId: "********",
    storageBucket: "********",
    messagingSenderId: "********",
    appId: "********",
    measurementId: "********"
  };
</script>

<Root let:firebase {firebaseConfig}>
  <User let:user let:auth>
    <h1>Signin Successfull</h1>
    <div slot="loading">
      {auth}
      <h1>Loading</h1>
    </div>
    <div slot="signed-out">
      <h1>You need to signin</h1>
      <button on:click={signInWithGoogle}>Sign In With Google</button>
    </div>
  </User>
</Root>
```
