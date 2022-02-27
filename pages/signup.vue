<template>
	<form
		@submit.prevent="signUp"
		class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2"
	>
		<NuxtLink to="/signin" class="flex justify-center mt-10"
			><Intouch
		/></NuxtLink>
		<div class="bg-white px-6 py-8 rounded mt-10 text-black w-full">
			<h1 class="mb-8 text-3xl text-center font-bold">Sign up</h1>
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
				Create Account
			</button>

			<div class="text-center text-sm text-grey-dark mt-4">
				By signing up, you agree to the
				<a
					class="no-underline border-b border-grey-dark text-grey-dark"
					href="#"
				>
					Terms of Service
				</a>
				and
				<a
					class="no-underline border-b border-grey-dark text-grey-dark"
					href="#"
				>
					Privacy Policy
				</a>
			</div>
		</div>

		<div class="text-grey-dark mt-6">
			Already have an account?
			<NuxtLink
				to="/signin"
				class="no-underline border-b border-blue text-blue"
			>
				Sign in
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
		async signUp() {
			console.log('strted');
			try {
				let data = {
					email: this.email,
					password: this.password,
				};
				const response = await this.$axios.post(
					'/api/auth/signup',
					data
				);
				console.log('Response:::', response);

				if (response.success) {
					this.$toast.error('Account successfully created');
					this.$auth.loginWith('local', {
						data: {
							email: this.email,
							password: this.password,
						},
					});
				}
				this.$router.push('/');
			} catch (error) {
				// this.$toast.error('Failed to created account');
				console.log(response.message);
			}
		},
	},
};
</script>
