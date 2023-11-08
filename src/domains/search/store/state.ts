import type { ISearchState } from '@/domains/search/store/types';

export default (): ISearchState => {
	return {
		search: null,
	};
};
