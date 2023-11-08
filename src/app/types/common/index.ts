// 공통영역의 type을 정리

export interface IndexableType<T> {
  [key: string]: T
}

export interface IUtils {
	hashStringTo32BitInteger(str: string): any;
	setCookie(key: string, value: string, expireTimes?: string): any;
	removeCookie(keyName: string): boolean;
	getCookie(key: string): string;
	setLocalStorage(key: string, value: string): void;
	getLocalStorage(key: string): string|null;
	delItemLocalStorage(key: string): void;
	delAllLocalStorage(): void;
}

export interface IVRouter {
	push(location: string|object): any;
}

export interface IEncryption {
	skc: string | null;
	hkc: string | null;
	m: string | null;
	e: string | null;
	c: string | null;
	rkc: string | null;
	iv: string | null;
	hCode: string | null;
	setPublic(M: string, E: string): void;
	encrypt(planText: string): string;
}
