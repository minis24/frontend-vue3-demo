<template>
	<div>SampleComponent</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'SampleComponent',
	data() {
		return {};
	},
	methods: {
		method1() {
			// ...
		},
	},
});
</script>
<script setup lang="ts">
import { getCurrentInstance, onMounted, type ComponentCustomProperties } from 'vue';

const inst = getCurrentInstance();
const self = inst?.appContext.config.globalProperties as ComponentCustomProperties;

onMounted(() => {
	self.$spa.utils.hashStringTo32BitInteger('aaaaa');
	window.spa.utils.hashStringTo32BitInteger('aaaaa');
});
</script>
