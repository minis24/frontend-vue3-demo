export default [
	{
		path: 'ui-component-ex',
		name: 'UiComponentEx',
		component: () => import('@/domains/example/pages/UiComponentEx.vue'),
		meta: { title: 'Component', },
	},
	{
		path: 'board-list',
		name: 'BoardList',
		component: () => import('@/domains/example/pages/board-api/BoardList.vue'),
		meta: { title: '게시판', },
	},
	{
		path: 'writing-board',
		name: 'WritingBoard',
		component: () => import('@/domains/example/pages/board-api/WritingBoard.vue'),
		meta: { title: '글쓰기', },
	},
	{
		path: 'modify-board/:no',
		name: 'BoardModify',
		component: () => import('@/domains/example/pages/board-api/ModifyBoard.vue'),
		meta: { title: '글수정', },
	},
	{
		path: 'board-detail/:no',
		name: 'BoardDetailNo',
		component: () => import('@/domains/example/pages/board-api/BoardDetail.vue'),
		meta: { title: '글 상세보기', },
	},
	{
		path: 'log-in',
		name: 'Login',
		component: () => import('@/domains/example/pages/board-api/Login.vue'),
		meta: { title: 'Login', },
	},
	{
		path: 'form-validate',
		name: 'FormValidate',
		component: () => import('@/domains/example/pages/form-ex/InputValidationEx.vue'),
		meta: { title: '폼 체크', },
	},
];
