import type { VNode } from 'vue';

export type TAlert = (message?: string|IAlertOption, option?: IAlertOption) => 
	Promise<any> & { innerClose: (vnode: any) => void };

export interface IAlertOption {
	type?: 'success'|'info'|'warning'|'error';
	close?: boolean;
	msg?: string;
	title?: string;
	autoDismiss?: number;
}

export interface IAlertStatusList {
	component: VNode;
	componentInstance: null;
	key: string;
	params: IAlertOption;
	resolve: any;
}

export type TConfirm = (message?: string, option?: IConfirmOption) =>
	Promise<any> & { close: (vnode: any, result: boolean) => void };

export interface IConfirmOption {
	type?: 'success'|'info'|'warning'|'error';
	msg?: string;
	title?: string;
	confirmButton?: string;
	cancelButton?: string;
}
