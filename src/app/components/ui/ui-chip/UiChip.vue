<template>
	<div>
		<v-chip
			v-bind:border="border"
		>
			<slot/>
		</v-chip>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'UiChip',
});
</script>
<script setup lang="ts">
import { ref } from 'vue';

defineProps({
	/**
	 * ui-chip에 테두리 스타일을 적용합니다.
	 * @type {String||Number||Boolean}
	 */
	border: { type: String || Number || Boolean, required: false, default: false, },
});
</script>

<style lang='scss' scoped>

</style>
