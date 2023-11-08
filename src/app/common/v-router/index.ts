import type { IVRouter } from '@/app/types/common';

//import { useRouter } from 'vue-router';


export default class VRouter implements IVRouter {
	private static instance: VRouter;

	public static getInstance(): VRouter {
		if (!this.instance) {
			this.instance = new VRouter();
		}
		return this.instance;
	}

	public push(location: string|object) {
		//const router = useRouter();
		// path로 인지
		if ( typeof location === 'string' ) {
			window.app.$router.push(location);
		} else if ( typeof location === 'object' ) {
			window.app.$router.push(location);
		}
	}

	public go(n: number) {
		window.app.$router.go(n);
	}

	
}
