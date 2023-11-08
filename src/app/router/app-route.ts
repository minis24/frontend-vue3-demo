import type { RouteRecordRaw } from 'vue-router';

import HomeRouter from '@/domains/home/router';
import ExRouter from '@/domains/example/router';
import SearchRouter from '@/domains/search/router';
import UiExRouter from '@/domains/ui-demo/router';

const Layout = () => import('@/app/pages/layout/LayoutIndex.vue');

const route: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		component: Layout,
		children: HomeRouter,
	},
	{
		path: '/example',
		name: 'Example',
		component: Layout,
		children: ExRouter,
	},
	{
		path: '/search',
		name: 'Search',
		component: Layout,
		children: SearchRouter,
	},
	{
		path: '/ui-demo',
		name: 'UiDemo',
		component: Layout,
		children: UiExRouter,
	},
];

export default route;
