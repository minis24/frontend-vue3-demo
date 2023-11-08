<template>
	<v-bottom-navigation
		app
		fixed
		grow
		color="primary"
		v-model="activeItem"
	>
		<v-btn
			value="Home"
			v-on:click="goRouter('/')"
		>
			<span>Home</span>
			<v-icon>mdi-home</v-icon>
		</v-btn>

		<v-btn
			value="Component"
			v-on:click="goRouter('/ui-demo/alert-demo')"
		>
			<span>Component</span>
			<v-icon>mdi-video-input-component</v-icon>
		</v-btn>

		<v-btn
			value="Board"
			v-on:click="goRouter('/example/board-list')"
		>
			<span>Board</span>
			<v-icon>mdi-clipboard-text</v-icon>
		</v-btn>
	</v-bottom-navigation>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'BottomNav',
	data() {
		return {};
	},
});
</script>
<script setup lang="ts">
import { ref } from 'vue';

const activeItem = ref('Home');

const goRouter = (path: string) => {
	window.spa.router.push(path);
};
</script>

<style lang='scss' scoped>
.v-btn {
	letter-spacing: normal;
}
</style>
