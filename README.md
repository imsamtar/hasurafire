## Hasurafire

A svelte components library for firebase-auth and hasura

## Setup

```
npm i -D hasurafire
```

### Edit _rollup.config.js_

```javascript
resolve({
  mainFields: ['module', 'browser', 'main']
}),
```

## Root

```html
<script>
  import { Root } from "hasurafire";
  const config = {
    firebaseConfig,
    server, // hasura server http address
    queries, // graphql queries, mutations and subscriptions
  };
</script>

<Root {...config} let:firebase>
  <!-- Here you have access to firebase object -->
</Root>
```

## User

```html
<script>
  import { User } from "hasurafire";
</script>

<User let:user let:auth on:signin on:signout on:in on:out>
  <!-- Here you have access to user object [current firebase user] -->
  <!-- Here you have access to auth object [firebase.auth()] -->
  <!-- on:signin is fired when user signs in -->
  <!-- on:signout  is fired when user signs out -->
  <!-- on:in is fired when user is already signed in as well as when user signs in -->
  <!-- on:out is fired when user is already signed in as well as when user signs out -->
  <!-- slot:default if user is signed in -->
  <!-- slot:signed-out if user is signed out -->
  <!-- slot:pending if not sure signed in or not -->
</User>
```

## SaveUser

```html
<script>
  import { User, SaveUser } from "hasurafire";
</script>

<User let:user={{ email, displayName }} let:needToSave>
  {#if needToSave}
    <SaveUser {mutation} variables={{ email, name: displayName }} let:response on:error={signOut} >
      <!-- Here you have access to response object [mutation response] -->
      <!-- on:new is fired when user successfull saved -->
      <!-- on:exists  is fired when user is already saved -->
      <!-- on:error is fired when some problem occours -->
      <!-- slot:default if saved successfully -->
      <!-- slot:exists if user already saved -->
      <!-- slot:error if some problem occours saving -->
      <!-- slot:saving while user is being saved -->
    </SaveUser>
  {/if}
</User>
```

## Query

```html
<script>
  import { Query } from "hasurafire";
  const variables = {};
</script>

<Query {query} {variables} let:execute let:response on:response on:error>
  <!-- prop: query, which accepts three types of input queryName|stringQuery|gqlTagQuery -->
  <!-- Here you have access to execute function, calling this function will execute this query -->
  <!-- Here you have access to response object [graphql query response] -->
  <!-- on:response is fired when new response is recieved from query -->
  <!-- on:error  is fired when some error occurs while quering -->
  <!-- optional prop: variables, which accepts an object containing all the variables needed for this graplql query -->
  <!-- optional prop: every, which accepts some number in seconds after which re-execute this query -->
  <!-- optional prop: started, which accepts some boolean value (not used with every prop) to start quering on mount) -->
  <!-- slot:default if query successfull -->
  <!-- slot:error if some problem occours while quering -->
  <!-- slot:pending while query is being executed -->
</Query>
```

## Mutation

```html
<script>
  import { Mutation } from "hasurafire";
  const variables = {};
</script>

<Mutation {mutation} {variables} let:execute let:response on:response on:error>
  <!-- prop: mutation, which accepts three types of input mutationName|stringMutation|gqlTagMutation -->
  <!-- Here you have access to execute function, calling this function will execute this mutation -->
  <!-- Here you have access to response object [graphql mutation response] -->
  <!-- on:response is fired when new response is recieved from mutation -->
  <!-- on:error  is fired when some error occurs while quering -->
  <!-- optional prop: variables, which accepts an object containing all the variables needed for this graplql mutation -->
  <!-- optional prop: every, which accepts some number in seconds after which re-execute this mutation -->
  <!-- optional prop: started, which accepts some boolean value (not used with every prop) to start quering on mount) -->
  <!-- slot:default if mutation successfull -->
  <!-- slot:error if some problem occours while mutating -->
  <!-- slot:pending while mutation is being executed -->
</Mutation>
```

## Subscribe

```html
<script>
  import { Subscribe } from "hasurafire";
  const variables = {};
</script>

<Subscribe {query} {variables} let:response on:response>
  <!-- prop: query, which accepts three types of input queryName|stringQuery|gqlTagQuery -->
  <!-- Here you have access to response object [graphql subscription response] -->
  <!-- on:response is fired when new response is recieved from subscription -->
  <!-- optional prop: variables, which accepts an object containing all the variables needed for this graplql subscription -->
  <!-- slot:default if subscription successfull -->
  <!-- slot:pending while subscribing -->
</Subscribe>
```

## Other things exported by hasurafire

### query:

- Type: function
- Parameters:
  - query
  - variables (optional)
- Returns
  - graphql query response

### mutate:

- Type: function
- Parameters:
  - mutatation
  - variables (optional)
- Returns
  - graphql mutatation response

### subscribe:

- Type: function
- Parameters:
  - query
  - variables (optional)
- Returns
  - object
    - observable
      - qraphql subscription observable
    - disconnect
      - function to disconnect this websocket connection

### firebase

- svelte store for firebase object

### user

- firebase current user

### loginStatus

- -1 if signed out
- 0 if not sure (pending)
- 1 if signed in

### accessToken

- JWT access token of currently signed-in user

### signInWithGoogle

- call this function to signin with popup with google

### signInWithGithub

- call this function to signin with popup with github

### signInWithFacebook

- call this function to signin with popup with facebook

### signInWithTwitter

- call this function to signin with popup with twitter

### signInWithOAuth

- call this function to signin with popup with 0Auth

### signInWithEmailAndPassword

- call this function to signin with email and password
- accepts email and password as arguments

### signOut

- call this function to signout
