<template>
	<div class="nav-section-title">
		<div class="title-wrapper">
			<span
				class="title-text"
				v-text="item.heading"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'SectionTitle',
});
</script>
<script setup lang="ts">
defineProps({
	item: { type: Object, required: false, default: null, },
});
</script>

<style lang='scss' scoped>
.nav-section-title:not(:first-child) {
    margin-block-start: 0.7rem;
}
.nav-section-title {
    margin-block-end: 0.5rem;
}
.nav-section-title {
    letter-spacing: 0.4px;
}
.nav-section-title {
	margin-block: 0;
	//margin-inline: 0 1.125rem;
	padding-block: 0;
	white-space: nowrap;
	
	block-size: 1.5rem;
	color: rgb(108 163 0);
	font-size: 0.95rem;
	padding-inline: 1.375rem 0rem;
	//text-transform: uppercase;
}

.nav-section-title .title-text {
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: flex-start;
	column-gap: 0.625rem;
}
.nav-section-title .title-text::before {
	border-block-end: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
	content: "";
	flex: 0 1 calc(1.375rem - 0.625rem);
	margin-inline-start: -1.375rem;
}

.nav-section-title .title-text::after {
	flex: 1 1 auto;
	border-block-end: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
	content: "";
}
</style>
