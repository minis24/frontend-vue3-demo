import type { IBoardListState } from '@/domains/example/store/types';

export default (): IBoardListState => {
	return {
		// state명은 api url명과 같게 하고 소문자로 만든다.
		board_list_cnt: null,
		board_list: null,
		board_detail: null,
		board_content: null,
		board_create: null,
		board_update: null,
		board_delete: null,
		needLogin: true,
		files: null,
	};
};
