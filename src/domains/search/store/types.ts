import type { IResponseSEARCH } from '@/domains/search/api/SEARCH';

export interface ISearchState {
  // search state에 IResponseSEARCH 타입을 적용하고 유니언 타입으로 null도 함께 적용한다.
	search: IResponseSEARCH | null
	// ...
}
