import UiDialog from '@/app/components/ui/ui-dialog/UiDialog.vue';
import type { VNode } from 'vue';

interface IDialogOption {
	close?: boolean;
	msg?: string;
	title?: string;
	component?: any;
	fullscreen?: boolean;
	params?: object;
}

export class Dialog {

	private notify(statusValue: any) {
		const data: any = statusValue;

		return new Promise((resolve) => {
			if (data) {
				data.resolve = resolve;
			}
		}).then((result) => {
			return result;
		});
	}

	public open(component: typeof UiDialog, params: IDialogOption) {
		console.log('ui dialog open!!');
		// 키 생성 (open시에만 일시적으로 생성해서 사용하므로 open함수 내에서 변수로 만들어 사용)
		const key = `ui-dialog-component-key_${window.ui.dialogComponentStatus.key++}`;
		// 열고자 하는 컴포넌트팝업을 리스트에 하나 추가한다.
		window.ui.dialogComponentStatus.list.push({
			component,
			params,
			key,
			componentInstance: null,
			resolve: null,
		});
		
		if (window.ui.dialogComponentStatus.dialogContainerVm) {
			// 팝업컨테이너가 새롭게 render하도록 한다.
			window.ui.dialogComponentStatus.dialogContainerVm.$forceUpdate();
		}
		return this.notify(window.ui.dialogComponentStatus.list[window.ui.dialogComponentStatus.list.length-1]);
	}

	public close(inst: any, result?: boolean) {
		console.log('UI Dialog close!!', inst);
		if (!inst) {
			return;
		}
		window.ui.dialogComponentStatus.list.some((item, index) => {
			if (inst && inst.key === window.ui.dialogComponentStatus.list[index].key) {
				window.ui.dialogComponentStatus.list[index].resolve(result);
				window.ui.dialogComponentStatus.list.splice(index, 1);
				if (window.ui.dialogComponentStatus.dialogContainerVm) {
					window.ui.dialogComponentStatus.dialogContainerVm.$forceUpdate();
				}
				
			}
		});
		//return this.notify(window.ui.dialogComponentStatus.list[window.ui.dialogComponentStatus.list.length-1]);
	}
}

export default (message: string|VNode, option: IDialogOption = {}) => {
	console.log('call ui dialog function!');
	const _inst = new Dialog();

	if (!message) {
		return _inst;
	}

	if (option.close) {
		return _inst.close(option.close);
	} else if (option.component || typeof message === 'object') {
		return _inst.open(UiDialog, {
			msg: '',
			title: option.title,
			fullscreen: option.fullscreen,
			params: option.params,
			component: message,
		});
	} else {
		return _inst.open( UiDialog, {
			msg: message,
			title: option.title,
			fullscreen: option.fullscreen || false,
			params: option.params,
		});
	}
};
