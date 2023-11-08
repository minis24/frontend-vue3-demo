import type { App } from 'vue';
import UiAlert from '@/app/common/ui/ui-alert';
import UiConfirm from '@/app/common/ui/ui-confirm';
import UiDialog from '@/app/common/ui/ui-dialog';
import type { TAlert } from '@/app/common/ui/types';
import type { IUi } from '@types';

export function setSSRUi(app: App) {
	const ui = {
		dialogStatus: {
			key: 0, // 팝업 생성시 고유의 키값을 생성하기 위한 일련번호
			list: [], // 생성된 팝업 컴포넌트들을 저장하는 리스트
			dialogContainerVm: null, // 팝업이 열릴 컨테이너 div의 인스턴스
		},
		dialogComponentStatus: {
			key: 0, // 팝업 생성시 고유의 키값을 생성하기 위한 일련번호
			list: [], // 생성된 팝업 컴포넌트들을 저장하는 리스트
			dialogContainerVm: null, // 팝업이 열릴 컨테이너 div의 인스턴스
		},
		alert: UiAlert as TAlert,
		confirm: UiConfirm,
		dialog: UiDialog,
	};
	app.config.globalProperties.$ui = ui as unknown as IUi;
	window.ui = ui as unknown as IUi;
	app.provide('ui', ui);
}

export default {
	install(app: App) {
		setSSRUi(app);
	},
};
