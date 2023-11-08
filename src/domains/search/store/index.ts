import { defineStore } from 'pinia';

// 만들어진 state, getters, actions를 불러온다.
import state from './state';
import actions from './action';

// 계좌 store를 생성한다. 통상적으로 이름(Account) 앞에 use접두사를 사용한다.
export const useSearchStore = defineStore('searchStore', {
	state,
	actions,
});
