import UiConfirm from '@/app/components/ui/ui-dialog/UiConfirm.vue';
import type { IConfirmOption } from './types';


export class Confirm {

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

	public open(component: typeof UiConfirm, params: IConfirmOption) {
		console.log('ui confirm open!!');
		// 키 생성 (open시에만 일시적으로 생성해서 사용하므로 open함수 내에서 변수로 만들어 사용)
		const key = `ui-dialog-key_${window.ui.dialogStatus.key++}`;
		// 열고자 하는 컴포넌트팝업을 리스트에 하나 추가한다.
		window.ui.dialogStatus.list.push({
			component,
			params,
			key,
			componentInstance: null,
			resolve: null,
		});
		
		if (window.ui.dialogStatus.dialogContainerVm) {
			// 팝업컨테이너가 새롭게 render하도록 한다.
			window.ui.dialogStatus.dialogContainerVm.$forceUpdate();
		}
		return this.notify(window.ui.dialogStatus.list[window.ui.dialogStatus.list.length-1]);
	}

	public close(inst: any, result?: boolean) {
		console.log('ui confirm close!!', inst);
		if (!inst) {
			return;
		}

		window.ui.dialogStatus.list.some((item, index) => {
			if (inst && inst.key === window.ui.dialogStatus.list[index].key) {
				window.ui.dialogStatus.list[index].resolve(result);
				window.ui.dialogStatus.list.splice(index, 1);
				if (window.ui.dialogStatus.dialogContainerVm) {
					window.ui.dialogStatus.dialogContainerVm.$forceUpdate();
				}
				
			}
		});
		return this.notify(window.ui.dialogStatus.list[window.ui.dialogStatus.list.length-1]);
	}
}

export default (message: string, option: IConfirmOption = {}) => {
	console.log('call ui confirm function!');
	const _inst = new Confirm();

	if (!message) {
		return _inst;
	}
	
	return _inst.open(UiConfirm,{
		msg: message,
		title: option.title,
		confirmButton: option.confirmButton,
		cancelButton: option.cancelButton,
	});
};
