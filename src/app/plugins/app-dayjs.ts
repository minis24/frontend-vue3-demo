import type { App } from 'vue';
import dayjs from 'dayjs';

export function setSSRDayjs(app: App) {
	app.config.globalProperties.$dayjs = dayjs;
	window.dayjs = dayjs;
	app.provide('dayjs', dayjs);
}

export default {
	install(app: App) {
		setSSRDayjs(app);
	},
};
