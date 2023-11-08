import type { App } from 'vue';
import { h } from 'vue';
//import { h, getCurrentInstance, type ComponentCustomProperties } from 'vue';

// globEager를 사용한 방법 =======================================
//export default {
//	install(app: App) {
//		const components = import.meta.globEager('@/app/components/ui/**/*.vue');
//		console.log('=======>', components);
//		Object.entries(components).forEach(([path, component,]) => {
//			console.log('===Global component===>', component);

//			const pathSplit = path.split('/');
//			const fileName = pathSplit[pathSplit.length - 1].split('.vue')[0].split('Ui')[1] as string;
//			console.log('===Global fileName===>', fileName);
//			const kebab = fileName.replace(/([a-z0–9])([A-Z])/g, '$1-$2').toLowerCase();
//			console.log('===Global kebab===>', kebab);
//			if (component) {
//				app.component(`ui-${kebab}`, component.default);
//			}
//		});
//	},
//};

function exec(component: () => any, callback: Function) {
	component().then((res: any) => {
		callback(res);
	});
}

// glob을 사용한 방법 =========================================
export function setSSRGlobalcomponent(app: App) {
	const components = import.meta.glob('@/app/components/ui/**/*.vue');

	Object.entries(components).forEach(([path, component,]) => {
		const pathSplit = path.split('/');
		const fileName = pathSplit[pathSplit.length - 1].split('.vue')[0];
		const fileSplit = fileName.split('Ui')[1] as string;
		const kebab = fileSplit.replace(/([a-z0–9])([A-Z])/g, '$1-$2').toLowerCase();

		// dialog-container는 한번만 만들어지면 되므로 'UiAlert'일때만 만들게 처리.
		//if (fileName === 'UiAlert' || fileName === 'UiConfirm' || fileName === 'UiDialog') {
		if (fileName === 'UiAlert') {
			// alert, confirm, popup이 띄워질 container div 태그 만들기.
			app.component('dialog-container', {
				name: 'DialogContainer',
				created() {
					window.ui.dialogStatus.dialogContainerVm = this;
				},
				render() {
					const children = window.ui.dialogStatus.list.map((popup: any) => {
						const attrProps = popup.params ? popup.params : {};
						return h(popup.component, {
							key: popup.key,
							...attrProps,
						});
					});
					return h('div', { class: 'g-dialog-container', style: 'z-index:9999999;', }, children);
				},
			});
		} else if (fileName === 'UiDialog') {
			// alert, confirm, popup이 띄워질 container div 태그 만들기.
			app.component('dialog-component-container', {
				name: 'Dialog2Container',
				created() {
					window.ui.dialogComponentStatus.dialogContainerVm = this;
				},
				render() {
					const children = window.ui.dialogComponentStatus.list.map((popup: any) => {
						const attrProps = popup.params ? popup.params : {};
						return h(popup.component, {
							key: popup.key,
							...attrProps,
						});
					});
					return h('div', { class: 'g-dialog-component-container', style: 'z-index:9999999;', }, children);
				},
			});
		} else {
			exec(component, (res: any) => {
				app.component(`ui-${kebab}`, res.default);
			});
		}

	});
}


export default {
	install(app: App) {
		setSSRGlobalcomponent(app);
	},
};




//import UiButton from '@/app/components/ui/ui-button/UiButton.vue';
//import UiButton2 from '@/app/components/ui/ui-button/UiButton2.vue';

//export default {
//	install(app: App): void {
//		app.component('ui-button', UiButton);
//		app.component('ui-button2', UiButton2);
//	},
//};
