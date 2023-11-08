//import { createRouter, createWebHashHistory } from 'vue-router';
//import routes from './app-route';
//import { useAppRootStore } from '@/app/store';
////

//const router = createRouter({
//	//history: createWebHistory(import.meta.env.BASE_URL),
//	history: createWebHashHistory(),
//	routes,
//});

//router.beforeEach((to, from, next) => {
//	console.log('!!!beforeEach to, from', to, from);
//	const topTitle = (to.meta.title as string) || '';
//	const appRootStore = useAppRootStore();
//	appRootStore.topRootTitle = topTitle;
//	if (topTitle === 'Home') {
//		appRootStore.isShowBack = false;
//	} else {
//		appRootStore.isShowBack = true;
//	}
//	next();
//});

//router.beforeResolve((to, from, next) => {
//	//console.log('beforeResolve to, from', to, from);
//	next();
//});

//router.afterEach((to, from) => {
//	if (to.path !== '/' && from.path !== '/') {
//		// ...
//	}
//});

//export default router;


import { createMemoryHistory, createWebHashHistory, createRouter as _createRouter } from 'vue-router';
import routes from './app-route';
import { useAppRootStore } from '@/app/store';

export const createRouter = () => {
	const router = _createRouter({
		history: import.meta.env.SSR ?
			createMemoryHistory(import.meta.env.BASE_URL) :
			//createWebHistory(import.meta.env.BASE_URL),
			createWebHashHistory(),
		routes,
	});

	router.beforeEach((to, from, next) => {
		console.log('!!!beforeEach to, from', to, from);
		const topTitle = (to.meta.title as string) || '';
		const appRootStore = useAppRootStore();
		appRootStore.topRootTitle = topTitle;
		if (topTitle === 'Home') {
			appRootStore.isShowBack = false;
		} else {
			appRootStore.isShowBack = true;
		}
		next();
	});

	router.beforeResolve((to, from, next) => {
		//console.log('beforeResolve to, from', to, from);
		next();
	});

	router.afterEach((to, from) => {
		if (to.path !== '/' && from.path !== '/') {
			// ...
		}
	});

	return router;
};

