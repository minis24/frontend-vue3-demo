export default [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/domains/home/pages/HomeIndex.vue'),
		meta: { title: 'Home', },
	},
];
