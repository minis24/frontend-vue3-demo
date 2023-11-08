export default [
	{
		path: 'search-list',
		name: 'SearchList',
		component: () => import('@/domains/search/pages/SearchList.vue'),
		meta: { title: 'API Test', },
	},
	// ... 다른 라우터 추가
];
