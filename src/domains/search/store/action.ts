import { apiHelper } from '@/app/store/helper';
import type { ActionTree } from '@/app/store/types';
// account api url 사용을 위한 Url을 가져온다.
import Url from '@/domains/search/api/url';
// account search api의 타입을 가져온다.
import type { IRequestSEARCH, IResponseSEARCH } from '@/domains/search/api/SEARCH';

// 생성될 API만큼 Action명을 만든다.
// Action명은 state명과 같게하고 대문자로 한다.
// enum명은 'E' + 업무명(Account) + 'Action' 형태로 만든다.
export enum ESearchAction {
	SEARCH = 'SEARCH',
  // ... action 계속 추가.
}

// 아래와 같은 형태로 apiHelper함수를 사용하여 action을 한줄 추가한다.
const actions: ActionTree<ESearchAction> = {
	[ESearchAction.SEARCH]: apiHelper<IRequestSEARCH, IResponseSEARCH>(Url.SEARCH, ESearchAction.SEARCH),
	// ... 다른 action 계속 추가 할 수 있음.
};

export default actions;
