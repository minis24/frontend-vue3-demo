<template>
	<div class="pa-4">
		<div>ComposableExPage</div>
		<v-form ref="inputForm">
			<v-container class="grey lighten-5">
				<v-row gutters>
					<v-col
						cols="12"
						sm="4"
					>
						<v-text-field
							label="first input"
							v-bind:rules="rules"
							hide-details="auto"
							v-model="firstTxt"
						/>
					</v-col>
				</v-row>
				<v-row gutters>
					<v-col
						cols="12"
						sm="4"
					>
						<v-text-field
							label="second input"
							v-bind:rules="rules"
							hide-details="auto"
							v-model="secondTxt"
						/>
					</v-col>
				</v-row>
				<v-row gutters>
					<v-col
						cols="12"
						sm="4"
					>
						<ui-button
							v-bind:disabled = "isDisabledBtn"
						>
							Apply
						</ui-button>
					</v-col>
				</v-row>
			</v-container>
		</v-form>
	</div>
</template>

<script lang="ts">
export default {
	name: 'InputValidationEx',
	components: {},
	props: {},
	data() {
		return {
			rules: [
				(value: any) => !!value || 'Required.',
				(value: any) => (value && value.length >= 3) || 'Min 3 characters',
			],
		};
	},
};
</script>
<script setup lang="ts">
import { ref, computed } from 'vue';

export type VForm = {
  validate: () => Promise<any>;
  resetValidation: () => boolean;
  reset: () => void;
};

const inputForm = ref(null);
const formValid = ref(false);

const firstTxt = ref('');
const secondTxt = ref('');

const isDisabledBtn = computed((): boolean => {
	if (inputForm.value) {
		getValidate();
		if ( formValid.value && firstTxt.value != '' && secondTxt.value != '') {
			return false;
		} else {
			return true;
		}
	} else {
		return true;
	}
});
const getValidate = async () => {
	const res = await (inputForm.value as unknown as VForm).validate();
	if (res.valid) {
		formValid.value = true;
	} else {
		formValid.value = false;
	}
};
</script>

<style lang='scss' scoped></style>
