<script lang="ts">
	import { Root, User, signUp, verifyEmail, signIn } from "hasurafire";
	import { signOut } from "hasurafire";

	let email = "";
	let password = "";

	const firebaseConfig = {
		apiKey: "",
		authDomain: "",
		projectId: "",
		storageBucket: "",
		messagingSenderId: "",
		appId: "",
		measurementId: "",
	};

	async function login() {
		try {
			await signIn(email, password);
		} catch (error) {
			console.log(error.message);
		}
	}

	async function createAccount() {
		try {
			await signUp(email, password);
			await verifyEmail();
		} catch (error) {
			console.log(error.message);
		}
	}
</script>

<Root {firebaseConfig}>
	<main>
		<User let:user let:auth>
			<div slot="signed-out">
				<h1>You need to Log In</h1>

				<form on:submit|preventDefault>
					<h2>enter email and password below</h2>
					<input
						type="email"
						placeholder="Email"
						bind:value={email}
					/>
					<input
						type="password"
						placeholder="********"
						bind:value={password}
					/>
					<button on:click={login}>Login</button>
					<button on:click={createAccount}>Create An Account</button>
				</form>
			</div>

			<!-- signed-in -->
			<h2>Welcome {user.email}</h2>
			<button on:click={signOut}>Sign Out</button>
		</User>
	</main>
</Root>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	button {
		cursor: pointer;
	}
</style>
