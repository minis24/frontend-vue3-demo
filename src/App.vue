<template>
	<v-app>
		<router-view />
	</v-app>
	<dialog-component-container/>
	<dialog-container/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// ssr 적용 시 window객체 undefined로 인하여 app mounted로 옮긴 소스.
import { setSSRSpa } from '@/app/plugins/app-spa';
import { setSSRUi } from '@/app/plugins/app-ui';
import { setSSRDayjs } from '@/app/plugins/app-dayjs';
import { setSSRGlobalcomponent } from '@/app/plugins/global-components';

export default defineComponent({
	name: 'App',
	mounted() {
		window.app = this;

		// ssr 적용 시 window객체 undefined로 인하여 app mounted로 옮긴 소스.
		if (import.meta.env.SSR) {
			setSSRSpa(window.app);
			setSSRUi(window.app);
			setSSRDayjs(window.app);
			setSSRGlobalcomponent(window.app);
		}
		
	},
});
</script>
