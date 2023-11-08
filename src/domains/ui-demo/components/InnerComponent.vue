<template>
	<v-card class="pa-5">
		<v-row
			style="display: block;flex:none;">
			<v-col cols="12">
				InnerComponent<br />
				<v-text-field
					bg-color="#fff"
					label="textfield예제"
					placeholder="textfield예제"
				/>
			</v-col>
		</v-row>
	</v-card>
</template>

<script lang="ts">
export default {
	name: 'InnerComponent',
	components: {},
	props: {},
	data() {
		return {};
	},
	methods: {},
};
</script>
<script setup lang="ts">
import { ref } from 'vue';
</script>

<style lang='scss' scoped></style>
