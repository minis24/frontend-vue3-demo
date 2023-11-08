/**
 * App Root State ============================================================
*/
export interface IAppRootState {
	topRootTitle: string
	isShowBack: boolean
}

/**
 * Getter Type ==============================================================
 */
// enum문으로 정의된 getter명을 모두 getter로 구현해줘야 하는 GetterTree 타입
export type GetterTree<G extends string | number | symbol> = {
  [K in G]: any
}

/**
 * Action Type ==============================================================
 */
// enum문으로 정의된 action명을 모두 Action으로 구현해줘야 하는 ActionTree 타입
export type ActionTree<A extends string | number | symbol> = {
  [K in A]: any
}
// ActionTree를 반환하는 Action의 타입
export type ActionType<A extends string | number | symbol> = () => ActionTree<A>;
	
