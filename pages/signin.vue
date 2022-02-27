<template>
	<form
		class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2"
		@submit.prevent="loginUser"
	>
		<NuxtLink to="/signin" class="flex justify-center mt-10"
			><Intouch
		/></NuxtLink>
		<div class="bg-white px-6 py-8 rounded mt-10 text-black w-full">
			<h1 class="mb-8 text-3xl text-center font-bold">Sign in</h1>
			<input
				v-model="email"
				type="text"
				class="block border border-grey-light w-full p-3 rounded-lg mb-4 focus:outline-[#00DB72] focus:border-[#00DB72] focus:shadow-outline"
				name="email"
				placeholder="Email"
			/>

			<input
				v-model="password"
				type="password"
				class="block border border-grey-light w-full p-3 rounded-lg mb-4 focus:outline-[#00DB72] focus:border-[#00DB72] focus:shadow-outline"
				name="password"
				placeholder="Password"
			/>

			<button
				type="submit"
				class="w-full text-center bg-[#00DB72] py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
			>
				Sign in
			</button>
		</div>

		<div class="text-grey-dark mt-6">
			Don't have an account yet?
			<NuxtLink
				to="/signup"
				class="no-underline border-b border-blue text-blue"
			>
				Sign up
			</NuxtLink>
		</div>
	</form>
</template>

<script>
export default {
	middleware: 'auth',
	auth: 'guest',

	data: () => ({
		email: '',
		password: '',
	}),
	methods: {
		async loginUser() {
			console.log('strted');
			try {
				this.$auth.loginWith('local', {
					data: {
						email: this.email,
						password: this.password,
					},
				});
			} catch (err) {
				this.$toast.error(err.message);
				console.log(err);
			}
		},
	},
};
</script>
