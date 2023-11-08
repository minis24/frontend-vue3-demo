import type { IResponseBoardListCnt } from '@/domains/example/api/BOARD_LIST_CNT';
import type { IResponseBoardList } from '@/domains/example/api/BOARD_LIST';
import type { IResponseBoardDetail } from '@/domains/example/api/BOARD_DETAIL';
import type { IResponseBoardContent } from '@/domains/example/api/BOARD_CONTENT';
import type { IResponseBoardCreate } from '@/domains/example/api/BOARD_CREATE';
import type { IResponseBoardUpdate } from '@/domains/example/api/BOARD_UPDATE';
import type { IResponseBoardDelete } from '@/domains/example/api/BOARD_DELETE';
import type { TResponseFiles } from '@/domains/example/api/FILES';

export interface IBoardListState {
	board_list_cnt: IResponseBoardListCnt | null
	board_list: IResponseBoardList | null
	board_detail: IResponseBoardDetail | null
	board_content: IResponseBoardContent | null
	board_create: IResponseBoardCreate | null
	board_update: IResponseBoardUpdate | null
	board_delete: IResponseBoardDelete | null
	needLogin: boolean
	files: TResponseFiles | null
}
