<template>
	<!--<div>
		<h1>Login</h1>
		<v-sheet width="300"
			class="mx-auto">
			<v-form fast-fail
				v-on:submit.prevent>
				<v-text-field
					label="id"
					v-bind:rules="idRules"
					v-model="id"
				/>

				<v-text-field
					label="password"
					v-bind:rules="passwordRules"
					type="password"
					v-model="password"
				/>

				<v-btn type="submit"
					block
					class="mt-2"
					v-on:click="onLogin"
				>Login</v-btn>
			</v-form>
		</v-sheet>
	</div>-->
	<div class="auth-wrapper d-flex align-center justify-center pa-4">
		<v-card
			class="auth-card pa-4 pt-7"
			max-width="448"
		>
			<v-card-item class="justify-center">
				<template v-slot:prepend>
					<div
						class="d-flex"
						style="width: 35px;height:35px;"
					>
						<!--<div v-html="logo" />-->
						<v-img
							v-bind:src="logoImg"/>
					</div>
				</template>

				<v-card-title class="font-weight-semibold text-2xl text-uppercase">
					SECUCEN
				</v-card-title>
			</v-card-item>

			<v-card-text class="pt-2">
				<h5 class="text-h5 font-weight-semibold mb-1">
					Welcome SECUCEN Demo page
				</h5>
				<p class="mb-0">
					Please sign-in to your account and start the adventure
				</p>
			</v-card-text>
			<v-card-text>
				<router-link
					to="/"
					replace
				>
					<p class="text-body-1 mb-0 text-info">◀ home으로 이동</p>
				</router-link>
			</v-card-text>
			<v-card-text>
				<v-form v-on:submit.prevent="() => {}">
					<v-row>
						<!-- email -->
						<v-col cols="12">
							<v-text-field
								label="id"
								v-bind:rules="idRules"
								v-model="id"
							/>
						</v-col>
						<!-- password -->
						<v-col cols="12">
							<v-text-field
								label="password"
								v-bind:rules="passwordRules"
								type="password"
								v-model="password"
							/>

							<!-- login button -->
							<v-btn type="submit"
								block
								class="mt-2"
								v-on:click="onLogin"
							>Login</v-btn>
						</v-col>
					</v-row>
				</v-form>
			</v-card-text>
			
		</v-card>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
const logoImg = new URL('@/assets/images/img_logo_secucen.png', import.meta.url).href;

export default defineComponent({
	name: 'LoginPage',
	data() {
		return {
			idRules: [
				(value: string) => {
					if (value?.length > 3) return true;

					return 'First name must be at least 3 characters.';
				},
			],
			passwordRules: [
				(value: any) => !!value || 'Required.',
			],
		};
	},
});
</script>
<script setup lang="ts">
import { ref } from 'vue';

import { useBoardListStore } from '@/domains/example/store';
const boardListStore = useBoardListStore();

const id = ref('testID-1@secucen.com');
const password = ref('1111');


const onLogin = () => {
	boardListStore.LOGIN({ userID: id.value, userPW: password.value, })
		.then((res: any) => {
			// 로그인 되면 홈으로 이동
			window.spa.router.push('/example/board-list');
		});
};
</script>

<style lang='scss' scoped>
//@use "@core/scss/pages/page-auth.scss";
</style>
