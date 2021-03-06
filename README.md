# hasurafire

### Collection of svelte components for firebase authentication and hasura

## Setup

```bash
npm i -D hasurafire
```

### Might need to edit _rollup.config.js_ (only if using rollup template)

```javascript
resolve({
  mainFields: ['module', 'browser', 'main']
}),
```


## API
---

### Root Component

```html
<script>
  import { Root } from "hasurafire";
  const config = {
    firebaseConfig,
    endpoint, // hasura graphql endpoint
    schema: 'v1', // %s in queries, mutations and subscriptions will be replaced by this value
    queries: {
      getMessages: `
        query get_messages {
          %s_messages {
            content
            sender_id
            chat_id
          }
        }
      `
    }, // graphql queries, mutations and subscriptions
  };
</script>

<Root {...config} global={{uid: '100'}} let:firebase>
  <!-- Here you have access to firebase object -->
  <!-- prop: firebaseConfig -->
  <!-- prop: endpoint, hasura graphql endpoint -->
  <!-- optional prop: queries, object with all queries, mutations and subscriptions -->
  <!-- optional prop: global, fallback values for query variables if variable undefined -->
  <!-- optional prop: analytics, firebase analytics -->
  <!-- optional prop: perf, firebase performence -->
  <!-- optional prop: schema, value which will replace %s in queries -->
  <!-- component props -->
    <!-- component -->
</Root>
```
---

### User Component

```html
<script>
  import { User } from "hasurafire";
</script>

<User (let|bind):user (let|bind):auth (let|bind):fresh_signin on:signin on:signout on:in on:out>
  <!-- Here you have access to user object [current firebase user] -->
  <!-- Here you have access to auth object [firebase.auth()] -->
  <!-- let:user current firebase user -->
  <!-- let:auth firebase.auth() -->
  <!-- let:fresh_signin just signed in -->
  <!-- let:signout signout function -->
  <!-- bind:user current firebase user -->
  <!-- bind:auth firebase.auth() -->
  <!-- bind:fresh_signin just signed in -->
  <!-- bind:signout signout function -->
  <!-- on:signin is fired when user signs in -->
  <!-- on:signout  is fired when user signs out -->
  <!-- on:in is fired when user is already signed in as well as when user signs in -->
  <!-- on:out is fired when user is already signed in as well as when user signs out -->
  <!-- slot:default if user is signed in -->
  <!-- slot:signed-out if user is signed out -->
  <!-- slot:pending if not sure signed in or not -->
  <!-- slot:start which is rendered all the time-->
  <!-- slot:end which is rendered all the time-->
  <!-- component props -->
    <!-- pending -->
    <!-- component -->
    <!-- out -->
</User>
```
---

### SaveUser Component

```html
<script>
  import { User, SaveUser } from "hasurafire";
</script>

<User let:user={{ email }} let:fresh_signin let:signout>
  {#if fresh_signin}
    <SaveUser {mutation} variables={{ email }} on:error={signout} >
      <!-- Here you have access to response object [mutation response] -->
      <!-- let:response response of mutation -->
      <!-- let:data response.data object -->
      <!-- let:error error if any -->
      <!-- bind:response response of mutation -->
      <!-- bind:data response.data object -->
      <!-- bind:error error if any -->
      <!-- on:new is fired when user successfull saved -->
      <!-- on:already_exists  is fired when user is already exists -->
      <!-- on:error is fired when some problem occours -->
      <!-- optional prop: role, save user while using a specific role -->
      <!-- optional prop: headers, save user while passing custom request headers to hasura -->
      <!-- optional prop: noauth, save user without authentication -->
      <!-- optional prop: adminsecret, save user using admin secret insead of firebase auth -->
      <!-- slot:default if saved successfully -->
      <!-- slot:already_exists if user already exists -->
      <!-- slot:error if some problem occours saving -->
      <!-- slot:pending while user is being saved -->
      <!-- slot:start which is rendered all the time-->
      <!-- slot:end which is rendered all the time-->
      <!-- component props -->
        <!-- pending -->
        <!-- component -->
        <!-- exists -->
        <!-- alt -->
    </SaveUser>
  {/if}
</User>
```
---

### Query Component

```html
<script>
  import { Query } from "hasurafire";
  const variables = {};
</script>

<Query started {query} {variables} let:execute let:response on:response on:error>
  <!-- prop: started, which is passed if query is to be started on mount -->
  <!-- prop: query, which accepts three types of input queryName|stringQuery|gqlTagQuery -->
  <!-- Here you have access to execute function, calling this function will execute this query -->
  <!-- Here you have access to response object [graphql query response] -->
  <!-- let:response response of query -->
  <!-- let:data response.data object -->
  <!-- let:error error if any -->
  <!-- bind:response response of query -->
  <!-- bind:data response.data object -->
  <!-- bind:error error if any -->
  <!-- on:response is fired when new response is recieved from query -->
  <!-- on:error  is fired when some error occurs while quering -->
  <!-- optional prop: variables, which accepts an object containing all the variables needed for this graplql query -->
  <!-- optional prop: every, which accepts some number in seconds after which re-execute this query -->
  <!-- optional prop: started, which accepts some boolean value (not used with every prop) to start quering on mount) -->
  <!-- optional prop: role, do this query hasura using a specific role -->
  <!-- optional prop: headers, do this query while passing custom request headers to hasura -->
  <!-- optional prop: noauth, do this query without authentication -->
  <!-- optional prop: adminsecret, do this query using admin secret insead of firebase auth -->
  <!-- slot:default if query successfull -->
  <!-- slot:error if some problem occours while quering -->
  <!-- slot:pending while query is being executed -->
  <!-- slot:start which is rendered all the time-->
  <!-- slot:end which is rendered all the time-->
  <!-- component props -->
    <!-- pending -->
    <!-- component -->
    <!-- alt -->
</Query>
```
---

### Mutate Component

```html
<script>
  import { Mutate } from "hasurafire";
  const variables = {};
</script>

<Mutate started {mutation} {variables} let:execute let:response on:response on:error>
  <!-- prop: started, which is passed if mutation is to be started on mount -->
  <!-- prop: mutation, which accepts three types of input mutationName|stringMutation|gqlTagMutation -->
  <!-- Here you have access to execute function, calling this function will execute this mutation -->
  <!-- Here you have access to response object [graphql mutation response] -->
  <!-- let:response response of mutation -->
  <!-- let:data response.data object -->
  <!-- let:error error if any -->
  <!-- bind:response response of mutation -->
  <!-- bind:data response.data object -->
  <!-- bind:error error if any -->
  <!-- on:response is fired when new response is recieved from mutation -->
  <!-- on:error  is fired when some error occurs while quering -->
  <!-- optional prop: variables, which accepts an object containing all the variables needed for this graplql mutation -->
  <!-- optional prop: every, which accepts some number in seconds after which re-execute this mutation -->
  <!-- optional prop: started, which accepts some boolean value (not used with every prop) to start quering on mount) -->
  <!-- optional prop: role, do this mutation hasura using a specific role -->
  <!-- optional prop: headers, do this mutation while passing custom request headers to hasura -->
  <!-- optional prop: noauth, do this mutation without authentication -->
  <!-- optional prop: adminsecret, do this mutation using admin secret insead of firebase auth -->
  <!-- slot:default if mutation successfull -->
  <!-- slot:error if some problem occours while mutating -->
  <!-- slot:pending while mutation is being executed -->
  <!-- slot:start which is rendered all the time-->
  <!-- slot:end which is rendered all the time-->
  <!-- component props -->
    <!-- pending -->
    <!-- component -->
    <!-- alt -->
</Mutate>
```
---

### Subscribe Component

```html
<script>
  import { Subscribe } from "hasurafire";
  const variables = {};
</script>

<Subscribe {query} {variables} let:response on:response>
  <!-- prop: query, which accepts three types of input queryName|stringQuery|gqlTagQuery -->
  <!-- Here you have access to response object [graphql subscription response] -->
  <!-- let:response response of query -->
  <!-- let:data response.data object -->
  <!-- let:error error if any -->
  <!-- bind:response response of query -->
  <!-- bind:data response.data object -->
  <!-- bind:error error if any -->
  <!-- on:response is fired when new response is recieved from subscription -->
  <!-- optional prop: variables, which accepts an object containing all the variables needed for this graplql subscription -->
  <!-- optional prop: role, do this query hasura using a specific role -->
  <!-- optional prop: headers, do this query while passing custom request headers to hasura -->
  <!-- optional prop: noauth, do this query without authentication -->
  <!-- optional prop: adminsecret, do this query using admin secret insead of firebase auth -->
  <!-- slot:default if subscription successfull -->
  <!-- slot:pending while subscribing -->
  <!-- slot:start which is rendered all the time-->
  <!-- slot:end which is rendered all the time-->
  <!-- component props -->
    <!-- pending -->
    <!-- component -->
    <!-- alt -->
</Subscribe>
```
---

### query:

- Type: function
- Parameters:
  - query
  - variables (optional)
  - options (optional) e.g. { role, headers, noauth, adminsecret }
- Returns
  - graphql query response
---

### mutate:

- Type: function
- Parameters:
  - mutatation
  - variables (optional)
  - options (optional) e.g. { role, headers, noauth, adminsecret }
- Returns
  - graphql mutatation response
---

### subscribe:

- Type: function
- Parameters:
  - query
  - variables (optional)
  - options (optional) e.g. { role, headers, noauth, adminsecret }
- Returns
  - object
    - observable
      - qraphql subscription observable
    - client
      - client.close() function to disconnect this websocket connection
---

### firebase

- svelte store for firebase object
---

### user

- firebase current user
---

### loginStatus

- -1 if signed out
- 0 if not sure (pending)
- 1 if signed in
---

### accessToken

- JWT access token of currently signed-in user
---

### global

- fallback values for query, mutation and subscription variables
---

### signInWithGoogle

- call this function to signin with popup with google
---

### signInWithGithub

- call this function to signin with popup with github
---

### signInWithFacebook

- call this function to signin with popup with facebook
---

### signInWithTwitter

- call this function to signin with popup with twitter
---

### signInWithOAuth

- call this function to signin with popup with 0Auth
---

### signInWithGoogleRedirect

- call this function to signin with redirect with google
---

### signInWithGithubRedirect

- call this function to signin with redirect with github
---

### signInWithFacebookRedirect

- call this function to signin with redirect with facebook
---

### signInWithTwitterRedirect

- call this function to signin with redirect with twitter
---

### signInWithOAuthRedirect

- call this function to signin with redirect with 0Auth
---

### signIn

- call this function to signin with email and password
- accepts email and password
---

### verifyEmail

- call this function to send verification email to user
---

### updateProfile

- call this function to update user's profile
- accepts an object
```javascript
{
  displayName: "", // optional
  photoURL: "" // optional
}
```
---

### updateEmail

- call this function to update user's email
- accepts email
---

### updatePassword

- call this function to update user's password
- accepts password
---

### resetPassword

- call this function to send password reset email to user
---

### signOut

- call this function to signout
---

### deleteAccount

- call this function to delete user's account
---