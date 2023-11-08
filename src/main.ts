import { createApp as _createApp, createSSRApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { createRouter } from '@/app/router';
import vuetify from '@/plugins/vuetify';
// spa global plugin namespace
import spa from '@/app/plugins/app-spa';
import ui from '@/app/plugins/app-ui';
import dayjs from '@/app/plugins/app-dayjs';
import GlobalComponents from '@/app/plugins/global-components';

//const app = createApp(App);

//app.use(createPinia());
//app.use(createRouter());
//app.use(vuetify);

//if (!import.meta.env.SSR) {
//	app.use(dayjs);
//	app.use(spa);
//	app.use(ui),
//	app.use(GlobalComponents);
//}

//app.mount('#app');

const router = createRouter();

export function createApp() {
	let app;
	if (import.meta.env.SSR) {
		app = createSSRApp(App);
	} else {
		app = _createApp(App);
		app.use(dayjs);
		app.use(spa);
		app.use(ui),
		app.use(GlobalComponents);
	}

	app.use(createPinia());
	app.use(router);
	app.use(vuetify);
	
	return { app, router, };
}
