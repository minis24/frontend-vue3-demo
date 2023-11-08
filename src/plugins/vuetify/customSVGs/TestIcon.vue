<template>
	<svg
		width="124"
		height="124"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		class="test-icon"
	>
		<g
			fill="none">
			<mask
				id="home-on-mask"
				fill="#fff">
				<path v-bind:d="d"/>
			</mask>
			<g
				mask="url(#home-on-mask)"
				fill="#0D82FF">
				<path v-bind:d="d"/>
			</g>
		</g> 
	</svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'TestIcon',
	data() {
		return {
			d : `
				m13.94 7.07-7 6.611A3 3 0 0 0 6 15.862V24.2A1.8 1.8 0 0 0 7.8 26h4.4a1.8 1.8 0 0 0 
				1.8-1.8v-2.7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2.7a1.8 
				1.8 0 0 0 1.8 1.8h4.4a1.8 1.8 0 0 0 1.8-1.8v-8.338a3 3 0 0 0-.94-2.18l-7-6.612a3 3 0 0 0-4.12 0z
			`,
		};
	},
});
</script>

<style lang="scss" scoped>
.test-icon {
	font-size: 50px !important;
}
</style>
