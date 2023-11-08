<template>
	<div>
		<h1>검색 리스트</h1>
		<v-card
			class="mx-auto"
			max-width="450"
		>
			<v-list lines="two">
				<v-list-item
					v-bind:title="item.title"
					v-bind:subtitle="item.url"
					prepend-avatar="https://cdn.vuetifyjs.com/images/lists/1.jpg"
					v-for="(item, index) in search?.hits"
					v-bind:key="index"
				/>
			</v-list>
		</v-card>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'SearchList',
	data() {
		return {
			items: [
				{
					avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
					title: 'Brunch this weekend?',
					url: `<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
				},
				{
					avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
					title: 'Summer BBQ',
					url: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
				},
				{
					avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
					title: 'Oui oui',
					url: '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
				},
				{
					avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
					title: 'Birthday gift',
					url: '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
				},
			],
		};
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
import { useSearchStore } from '@/domains/search/store';
import { storeToRefs } from 'pinia';
const searchStore = useSearchStore();
const { search, } = storeToRefs(searchStore);

const inst = getCurrentInstance();
const self = inst?.appContext.config.globalProperties as ComponentCustomProperties;

onMounted(() => {
	searchStore.SEARCH({ option: { method: 'get', }, });
});
</script>


<style lang='scss' scoped></style>
