import { createApp } from './main.ts';

// RSA 암호화 관련 import 내용 -------------------------------
import ApiClient from '@/app/api';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import cryptojs from 'crypto-js';
// RSA 암호화 관련 import 내용 -------------------------------

const { app, router, } = createApp();

if (import.meta.env.SSR) {
	router.isReady().then(() => {
		app.mount('#app');
		console.log('after ssr hydrated!');
	});
} else {
	app.mount('#app');
}

// RSA 암호화 관련 코드----------------------------------------
// eslint-disable-next-line no-unused-vars
function getPubkey() {
	ApiClient.request({
		method: 'get',
		url: 'api/pilot/pki/publickey',
	}).then((res) => {
		// handle success
		//키생성 결과정보
		const resData = res.data.bdy.data;
		const m = resData.publicKeyModulus;
		const e = resData.publicKeyExponent;
		window.spa.encryption.m = m;
		window.spa.encryption.e = e;

		// eslint-disable-next-line no-undef
		const rsa = new RSAKey();
		rsa.setPublic(m, e);

		getRendomKey();
		window.spa.encryption.c = rsa.encrypt(window.spa.encryption.rkc);
		console.log('========> C::::', window.spa.encryption.c);
		//const hCode = hmacsha256(window.spa.encryption.c, window.spa.encryption.hkc);
		//const t = rsa.encrypt(hCode);
		//const t = cryptojs.createHmac('sha256', window.spa.encryption.c).update(window.spa.encryption.hkc).digest('hex');
		//const t = cryptojs.HmacSHA256(window.spa.encryption.hkc, window.spa.encryption.c);
		const t = cryptojs.HmacSHA256(window.spa.encryption.c, window.spa.encryption.hkc);
		//const t = cryptojs.HmacSHA256('3059abe14d11c09ababe2d8994ab0184abab702dd2420da635b1d39699197e7d98d2754a9783d84d1f2d131e01ece9fb36e7db2abd3d65cafce906b5710218f235a1fd418931e22ea0cf6164deb180bb150e977bd3ac428cc45e3e5a5d97b54a15c7fcf35588cd5591f62b43f46d57116cf1d6e4a29cbc876d7762c085a953063d118ea012e5eb363fc83942a8ae2421be9aa102e8fa1b45058120920ce6f0136fb99e6f9fa0d717779f2cd2fe6c0ec47e20542cf96a45d81d277a439d4f1f46013730bd07f0d3a281b6fcb0a18cd5c49e3b15aae0a1f919cf6a51702ad9cbd1214db999c0f8522fc3aa6451f95c52988ed3a0d3ccb1672b085cd5ca550cc694', '8d89587373e813865099e662b4a82ed6346c5d1b4381b1900d32d78663d9f4a8');
		window.spa.encryption.hCode = t;
		console.log('========> hCode::::', cryptojs.enc.Hex.stringify(t));
		//test();
		apiRandomKey();
	}).catch(function (response) {
		// handle error
		console.log('getPubkey|error!!!', response);
	});

}

//function test() {
//	ApiClient.request({
//		method: 'get',
//		url: 'api/pilot/pki/dec',
//		params: {
//			encHexString: window.spa.encryption.c,
//		},
//	}).then((res) => {
//		console.log('========> decode res::::', res.data.bdy.data);
//		//console.log('========> c:::::::::::::', window.spa.encryption.c);
//		//console.log('========> m:::::::::::::', window.spa.encryption.m);
//		console.log('===> 랜덤키::', window.spa.encryption.rkc);
//	}).catch(function (response) {
//		// handle error
//		console.log('decode|error!!!'+JSON.stringify(response));
//	});
//}

function apiRandomKey() {
	ApiClient.request({
		method: 'get',
		url: 'api/pilot/pki/randomkey',
		params: {
			randomKey: window.spa.encryption.c,
			tailCode: window.spa.encryption.hCode,
		},
	}).then((res) => {
		console.log('========> call api randomkey then::::', res);
	}).catch(function (response) {
		// handle error
		console.log('call api randomkey|error!!!'+JSON.stringify(response));
	});
}

function getRendomKey() {
	const array = new Uint8Array(24);
	crypto.getRandomValues(array).reduce((data, byte) => data + String.fromCharCode.apply(byte), '');
	//console.log('===========> random bytes:: ', array );
	const str = window.btoa(String.fromCharCode.apply(null, Array.from(array)));
	//console.log('=======> RKc::---', str       );
	window.spa.encryption.rkc = str;
	console.log('======> S substring 원본:', str.substring(0, 16));
	console.log('======> H substring 원본:', str.substring(16, 32));
	console.log('======> S substring sha256 hex:', cryptojs.enc.Hex.stringify(sha256(str.substring(0, 16))));
	console.log('======> H substring sha256 hex:', cryptojs.enc.Hex.stringify(sha256(str.substring(16, 32))));
	const s = cryptojs.enc.Hex.stringify(sha256(str.substring(0, 16)));
	const h = cryptojs.enc.Hex.stringify(sha256(str.substring(16, 32)));
	window.spa.encryption.skc = s;
	window.spa.encryption.hkc = h;

	window.spa.encryption.iv = Base64.stringify(sha256(s + h));
	console.log('======> iv:', window.spa.encryption.iv);
	return str;
}

//getPubkey();
