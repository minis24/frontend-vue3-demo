import type { IEncryption } from '@/app/types/common';
//import { useCookies } from 'vue3-cookies';
//const { cookies, } = useCookies();

export default class Encryption implements IEncryption {
	public c = null;
	public rkc = null;
	public iv = null;
	public hCode = null;
	public m = null;
	public e = null;
	public skc = null;
	public hkc = null;

	private static instance: Encryption;

	public static getInstance(): Encryption {
		if (!this.instance) {
			this.instance = new Encryption();
		}
		return this.instance;
	}

	public setPublic(M: string, E: string) {}
	public encrypt(planText: string) {
		return '';
	}

}
