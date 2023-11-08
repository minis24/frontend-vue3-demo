<template>
	<top-toolbar />
	<v-main class="bg-grey-lighten-4 main-color">
		<v-container>
			<v-row>
				<v-col>
					<router-view />
				</v-col>
			</v-row>
		</v-container>
	</v-main>
	<BottomNav />
	
</template>

<script setup lang="ts">
import TopToolbar from '@/app/pages/layout/TopToolbar.vue';
import BottomNav from '@/app/pages/layout/BottomNav.vue';

</script>
<style lang="scss" scoped>
.main-color {
	color: #213547 !important;
} 
</style>
