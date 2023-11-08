export default [
	{
		path: 'alert-demo',
		name: 'UiAlertDemo',
		component: () => import('@/domains/ui-demo/pages/UiAlertDemo.vue'),
		meta: { title: 'ui-alert', },
	},
	{
		path: 'confirm-demo',
		name: 'UiConfirmDemo',
		component: () => import('@/domains/ui-demo/pages/UiConfirmDemo.vue'),
		meta: { title: 'ui-confirm', },
	},
	{
		path: 'dialog-demo',
		name: 'UiDialogDemo',
		component: () => import('@/domains/ui-demo/pages/UiDialogDemo.vue'),
		meta: { title: 'ui-dialog', },
	},
	{
		path: 'chip-demo',
		name: 'UiChipDemo',
		component: () => import('@/domains/ui-demo/pages/UiChipDemo.vue'),
		meta: { title: 'ui-chip', },
	},
];
