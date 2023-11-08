import Utils from '../src/app/common/utils';
import VRouter from '@/app/common/v-router';
import Vue from 'vue';
import dayjs from 'dayjs';
import type { TAlert, TConfirm } from '@/app/common/ui/types';
import Prism from 'prismjs';

interface ISPA extends Vue {
	utils: Utils;
	router: VRouter;
}
interface IDialogStatus {
	key: number;
	list: any[];
	dialogContainerVm: any;
}

export interface IUi extends Vue {
	dialogStatus: IDialogStatus;
	dialogComponentStatus: IDialogStatus;
	alert: TAlert;
	confirm: TConfirm;
	dialog: any;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $spa: ISPA;
		$ui: IUi;
		$app: Vue;
		$dayjs: dayjs;
  }
}

declare global {
	interface Window {
		spa: ISPA;
		ui: IUi;
		app: Vue;
		dayjs: dayjs;
		Prism: Prism | {};
		RSAKey: any;
	}
}
