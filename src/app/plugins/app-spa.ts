import type { App } from 'vue';
import Utils from '@/app/common/utils';
import VRouter from '@/app/common/v-router';
import Encryption from '@/app/common/encryption';

export function setSSRSpa(app: App) {
	const spa = {
		utils: Utils.getInstance(),
		router: VRouter.getInstance(),
		encryption: Encryption.getInstance(),
	};
	app.config.globalProperties.$spa = spa;
	window.spa = spa;
	app.provide('spa', spa);
}

export default {
	install(app: App) {
		setSSRSpa(app);
	},
};
