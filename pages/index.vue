<template>
	<div class="h-screen box-border bg-white py-[35px] px-[200px]">
		<div class="grid grid-col-1 h-full">
			<NuxtLink
				to="/dashboard"
				class="w-full overflow-hidden bg-red-60 row-span-1 flex items-center"
			>
				<Intouch />
			</NuxtLink>

			<!-- Modal -->

			<div
				v-show="showModal"
				class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-10"
			>
				<form class="bg-white shadow-md rounded px-12 pt-6 pb-8 mb-4">
					<div class="mb-4">
						<label
							class="block text-gray-700 text-sm font-bold mb-2"
							for="full_name"
						>
							Full Name
						</label>
						<input
							required
							class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="full_name"
							type="text"
							placeholder="Full Name"
							v-model="full_name"
						/>
					</div>
					<div class="mb-2">
						<label
							class="block text-gray-700 text-sm font-bold mb-2"
							for="phone"
						>
							Email
						</label>
						<input
							class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="email"
							type="tel"
							placeholder="Email"
							v-model="email"
						/>
					</div>
					<div class="mb-2">
						<label
							class="block text-gray-700 text-sm font-bold mb-2"
							for="phone_number"
						>
							Phone Number
						</label>
						<input
							class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="phone_number"
							type="tel"
							placeholder="Phone Number"
							v-model="phone"
						/>
					</div>
					<div class="mb-6">
						<label
							class="block text-gray-700 text-sm font-bold mb-2"
							for="Address"
						>
							Address
						</label>
						<input
							class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="phone_number"
							type="text"
							placeholder="Address"
							v-model="address"
						/>
					</div>
					<div class="flex items-center justify-between">
						<button
							@click="showModal = false"
							type="button"
							class="border-[#00DB72] border text-sm text-[#00db71ce] font-medium py-[10px] px-[14px] rounded-md flex"
						>
							Cancel
						</button>
						<button
							@click="onAddNewContact"
							type="button"
							class="bg-[#00DB72] text-sm hover:bg-[#00db71ce] text-white font-medium py-[10px] px-[14px] rounded-md flex"
						>
							Add Contact
						</button>
					</div>
				</form>
			</div>

			<div
				class="w-full overflow-hidden row-span-1 flex flex-row items-center mt-4"
			>
				<!-- Searchbar -->
				<div class="basis-3/4">
					<div class="relative text-gray-600 flex flex-flow-row">
						<input
							class="border-2 border-gray-200 bg-white h-12 pl-6 w-full pr-[3rem] rounded-lg text-sm focus:outline-none"
							type="search"
							name="search"
							placeholder="Search..."
							v-model="searchQuery"
						/>
						<button
							type="submit"
							class="absolute right-0 top-0 mt-4 pr-4"
						>
							<svg
								class="text-gray-600 h-4 w-4 fill-current"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								version="1.1"
								id="Capa_1"
								x="0px"
								y="0px"
								viewBox="0 0 56.966 56.966"
								style="enable-background: new 0 0 56.966 56.966"
								xml:space="preserve"
								width="512px"
								height="512px"
							>
								<path
									d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
								/>
							</svg>
						</button>
					</div>
				</div>

				<!-- New Contact  -->
				<div class="basis-1/4 flex justify-end">
					<!--New Contact Modal Form-->

					<button
						@click="showModal = true"
						type="button"
						class="bg-[#00DB72] text-sm hover:bg-[#00db71ce] text-white font-medium py-[10px] px-[14px] rounded-md flex"
					>
						New Contact
					</button>
				</div>
			</div>

			<!-- Contact Listing  -->
			<!-- <div
				v-if="this.$fetchState.pending"
				class="text-center loader mb-5"
			>
				Fetching contacts...
			</div> -->

			<div class="w-full row-span-6 grid grid-cols-4 gap-6 mt-6">
				<div class="rounded col-span-4">
					<div
						v-for="contact in contacts"
						:key="contact._id"
						class="transition ease-in-out delay-80 duration-300 flex items-center border rounded-xl cursor-pointer p-2 mb-4 hover:drop-shadow-xl hover:bg-white hover:border-white"
					>
						<img
							class="w-8 h-8 rounded-lg mr-4"
							src="../assets/img/avatar.png"
							alt="Avatar"
						/>
						<div class="text-sm w-[90%] flex justify-around">
							<span class="text-gray-800 font-semibold">
								{{ contact.name }}
							</span>
							<span class="text-gray-800 font-semibold">
								{{ contact.phone }}
							</span>
							<span class="text-gray-500 leading-none">
								{{ contact.email }}
							</span>
							<span class="text-gray-500 leading-none truncate">
								{{ contact.address }}
							</span>
						</div>
						<span class="w-20 mr-[1rem] cursor-pointer">
							<MoreIcon @click="showModal = true" />
						</span>
					</div>
					<!-- <h3
						v-else
						class="text-center text-[#666666] opacity-1 text-[18px]"
					>
						NO RECORD FOUND
					</h3> -->
				</div>

				<!-- View Contact  -->
				<!-- <div
					class="border overflow-hidden rounded-md col-span-1 py-1 h-[24rem] flex flex-col space-x-2 items-center"
				>
					<img
						class="w-14 h-14 rounded-lg mt-10"
						src="../assets/img/avatar.png"
						alt="Avatar"
					/>
					<span class="text-gray-800 font-semibold mt-8">
					</span>
					<div class="border-t w-full flex mt-6">
						<span
							class="text-gray-500 flex items-center font-medium text-sm pl-11 p-2"
						>
						</span>
					</div>
					<div class="border-t w-full flex">
						<span
							class="text-gray-500 flex items-center font-regular text-sm p-2"
						>
						</span>
					</div>
					<div class="border-t w-full flex">
						<span
							class="text-gray-500 flex items-center font-regular text-center text-sm p-2"
						>
						</span>
					</div>
					<div class="border-t w-full flex">
						<span
							class="text-gray-500 flex items-center font-regular text-center text-sm p-2"
						>
						</span>
					</div>
					<div class="w-full flex justify-center">
						<button
							@click="onLogOut"
							type="button"
							class="bg-[#ff3636f5] text-sm hover:bg-[#ff3636cc] text-white font-medium py-[8px] px-[12px] rounded-md flex"
						>
							Log out
						</button>
					</div>
				</div> -->
			</div>

			<!-- Spinner -->
			<!-- <div class="flex">
				<div class="relative">
					<div
						class="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"
					></div>

					<div
						class="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-green-500 border-t-transparent"
					></div>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showModal: false,
			more: false,
			searchQuery: '',
			contacts: [],
			selectedContact: '',
			full_name: '',
			phone: '',
			email: '',
			address: '',
		};
	},

	computed: {
		// filteredContacts() {
		// 	return this.contacts.filter((contact) => {
		// 		return contact.full_name
		// 			.toLowerCase()
		// 			.includes(this.searchQuery.toLowerCase());
		// 	});
		// },
		// query() {
		// 	if (this.searchQuery) {
		// 		return this.contacts.filter((contact) => {
		// 			return this.searchQuery
		// 				.toLowerCase()
		// 				.split(' ')
		// 				.every(
		// 					(v) =>
		// 						contact &&
		// 						contact.User &&
		// 						contact.User.full_name &&
		// 						contact.User.email &&
		// 						contact.User.phone &&
		// 						contact.User.address.toLowerCase().includes(v)
		// 				);
		// 		});
		// 	} else {
		// 		return this.contacts;
		// 	}
		// },
	},

	mounted() {
		this.getContacts();
	},

	methods: {
		viewContact(contact) {
			this.selectedContact = contact;
			console.log('CLICKED:::', contact);
		},
		async getContacts() {
			try {
				const response = await this.$axios.$get(
					`http://localhost:3000/api/contacts`
				);
				console.log('Get Contact::::', response);
				if (response.status == true) {
					this.$toast.success(response.message);
					this.contacts = response;
					console.log('Contacts:::', this.contacts);
				}
			} catch (err) {
				this.$toast.error(response.message);
				console.log('GET CONTACT::::', err);
			}
		},

		async onAddNewContact() {
			try {
				let data = {
					full_name: this.full_name,
					phone: this.phone,
					email: this.email,
					address: this.address,
				};
				console.log('BEFORE POST CONTACTS:::', data);

				let response = await this.$axios.$post(
					`http://localhost:3000/api/contacts`,
					data
				);
				console.log('Post Contact::::', response);
				if (response.status == true) {
					this.showModal = false;
					this.getContacts();
				}
			} catch (err) {
				// this.$toast.error(response.message);
				console.log('POST CONTACTS::::', err);
			}
		},

		async onLogOut() {
			await this.$auth.logout();
			this.$router.push('/signin');
		},

		openModal() {
			this.showModal = true;
		},

		closeModal() {
			this.showModal = false;
		},
	},
};
</script>

<style scoped>
* {
	font-family: 'Inter', sans-serif;
}
</style>
