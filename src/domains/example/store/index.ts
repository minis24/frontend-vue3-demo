import { defineStore } from 'pinia';

// 만들어진 state, getters, actions를 불러온다.
import state from './state';
import actions from './action';

// board list store를 생성한다. 통상적으로 이름 앞에 use접두사를 사용한다.
export const useBoardListStore = defineStore('boardListStore', {
	state,
	actions,
});
