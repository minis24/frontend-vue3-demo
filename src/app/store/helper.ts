import ApiClient from '@/app/api';
import makeRequestConfig from '@/app/store/request';


export const apiRequestHelper = async <IReq, IRes>(url: string, payload?: any) => {
	try {
		const reqConfig = payload?.option
			? makeRequestConfig<IReq>(url, payload, payload.option)
			: makeRequestConfig<IReq>(url, payload);
		const response = await ApiClient.request<IRes>(reqConfig);

		return response;
	} catch (err) {
		console.error('[Call API] ERROR: ', err);
		throw(err);
	}
};

export const apiHelper = <IReq, IRes>(url: string, action: string) => {
	return async function(this: any, payload?: any){
		try {
			const reqConfig = payload?.option
				? makeRequestConfig<IReq>(url, payload, payload.option)
				: makeRequestConfig<IReq>(url, payload);
			const response = await ApiClient.request<IRes>(reqConfig);
			const key = action.toLowerCase();
			
			// response를 state에 저장 할 필요가 없는 경우(isSetState)를 판단.
			if (payload?.option?.isSetState !== false) {
				if (response.data.bdy) {
					this[key] = response.data.bdy;
				} else {
					this[key] = response.data;
				}
			}
			return response;
		} catch (err: any|Error) {
			// 공통 에러처리
			ApiClient.handleError(err, this);
			console.error('[Call API] ERROR: ', err);
			throw(err);
		}
	};
};

// 외부 API호출을 위한 helper 함수 (IResponse가 빠진 request)
export const outerApiHelper = <IReq, IRes>(url: string, action: string) => {
	return async function(this: any, payload?: any){
		try {
			const reqConfig = payload?.option
				? makeRequestConfig<IReq>(url, payload, payload.option)
				: makeRequestConfig<IReq>(url, payload);
			const response = await ApiClient.outerRequest<IRes>(reqConfig);
			const key = action.toLowerCase();
			this[key] = response.data;
			return response;
		} catch (err) {
			console.error('[Call API] ERROR: ', err);
			throw(err);
		}
	};
};
