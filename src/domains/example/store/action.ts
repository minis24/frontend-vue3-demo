// 공통 타입인 ActionTree타입과, axios헬퍼 공통 함수인 apiHelper함수를 가져온다.
import { apiHelper } from '@/app/store/helper';
import type { ActionTree } from '@/app/store/types';
// board list api url 사용을 위한 Url을 가져온다.
import Url from '@/domains/example/api/url';
// account search api의 타입을 가져온다.
import type { TRequestBoardListCnt, IResponseBoardListCnt } from '@/domains/example/api/BOARD_LIST_CNT';
import type { TRequestBoardList, IResponseBoardList } from '@/domains/example/api/BOARD_LIST';
import type { TRequestBoardDetail, IResponseBoardDetail } from '@/domains/example/api/BOARD_DETAIL';
import type { IRequestBoardContent, IResponseBoardContent } from '@/domains/example/api/BOARD_CONTENT';
import type { IRequestBoardCreate, IResponseBoardCreate } from '@/domains/example/api/BOARD_CREATE';
import type { IRequestBoardUpdate, IResponseBoardUpdate } from '@/domains/example/api/BOARD_UPDATE';
import type { IRequestBoardDelete, IResponseBoardDelete } from '@/domains/example/api/BOARD_DELETE';
import type { IRequestLOGIN, IResponseLOGIN } from '@/domains/example/api/LOGIN';
import type { IRequestAttachFileList, TResponseAttachFileList } from '@/domains/example/api/ATTACH_FILELIST';
import type { IRequestAttachFileDelete, IResponseAttachFileDelete } from '@/domains/example/api/ATTACH_FILEDELETE';
import type { IRequestAttachFileMapping, TResponseAttachFileMapping } from '@/domains/example/api/ATTACH_FILEMAPPING';
import type { IRequestFiles, TResponseFiles } from '@/domains/example/api/FILES';
import type { IRequestFileDownload, TResponseFileDownload } from '@/domains/example/api/ATTACH_FILEDOWNLOAD';

// 생성될 API만큼 Action명을 만든다.
// Action명은 state명과 같게하고 대문자로 한다.
export enum EBoardListAction {
	BOARD_LIST_CNT = 'BOARD_LIST_CNT',
	BOARD_LIST = 'BOARD_LIST',
	BOARD_DETAIL = 'BOARD_DETAIL',
	BOARD_CONTENT = 'BOARD_CONTENT',
	BOARD_CREATE = 'BOARD_CREATE',
	BOARD_UPDATE = 'BOARD_UPDATE',
	BOARD_DELETE = 'BOARD_DELETE',
	LOGIN = 'LOGIN',
	ATTACH_FILELIST = 'ATTACH_FILELIST',
	ATTACH_FILEDELETE = 'ATTACH_FILEDELETE',
	ATTACH_FILEMAPPING = 'ATTACH_FILEMAPPING',
	FILES = 'FILES',
	ATTACH_FILEDOWNLOAD = 'ATTACH_FILEDOWNLOAD',
  // ... action 계속 추가.
}

const actions: ActionTree<EBoardListAction> = {
	[EBoardListAction.LOGIN]: apiHelper<IRequestLOGIN, IResponseLOGIN>(Url.LOGIN, EBoardListAction.LOGIN),
	[EBoardListAction.BOARD_LIST_CNT]: apiHelper<TRequestBoardListCnt, IResponseBoardListCnt>(Url.BOARD_LIST_CNT, EBoardListAction.BOARD_LIST_CNT),
	[EBoardListAction.BOARD_LIST]: apiHelper<TRequestBoardList, IResponseBoardList>(Url.BOARD_LIST, EBoardListAction.BOARD_LIST),
	[EBoardListAction.BOARD_DETAIL]: apiHelper<TRequestBoardDetail, IResponseBoardDetail>(Url.BOARD_DETAIL, EBoardListAction.BOARD_DETAIL),
	[EBoardListAction.BOARD_CONTENT]: apiHelper<IRequestBoardContent, IResponseBoardContent>(Url.BOARD_CONTENT, EBoardListAction.BOARD_CONTENT),
	[EBoardListAction.BOARD_CREATE]: apiHelper<IRequestBoardCreate, IResponseBoardCreate>(Url.BOARD_CREATE, EBoardListAction.BOARD_CREATE),
	[EBoardListAction.BOARD_UPDATE]: apiHelper<IRequestBoardUpdate, IResponseBoardUpdate>(Url.BOARD_UPDATE, EBoardListAction.BOARD_UPDATE),
	[EBoardListAction.BOARD_DELETE]: apiHelper<IRequestBoardDelete, IResponseBoardDelete>(Url.BOARD_DELETE, EBoardListAction.BOARD_DELETE),
	[EBoardListAction.ATTACH_FILELIST]: apiHelper<IRequestAttachFileList, TResponseAttachFileList>(Url.ATTACH_FILELIST, EBoardListAction.ATTACH_FILELIST),
	[EBoardListAction.ATTACH_FILEDELETE]: apiHelper<IRequestAttachFileDelete, IResponseAttachFileDelete>(Url.ATTACH_FILEDELETE, EBoardListAction.ATTACH_FILEDELETE),
	[EBoardListAction.ATTACH_FILEMAPPING]: apiHelper<IRequestAttachFileMapping, TResponseAttachFileMapping>(Url.ATTACH_FILEMAPPING, EBoardListAction.ATTACH_FILEMAPPING),
	[EBoardListAction.FILES]: apiHelper<IRequestFiles, TResponseFiles>(Url.FILES, EBoardListAction.FILES),
	[EBoardListAction.ATTACH_FILEDOWNLOAD]: apiHelper<IRequestFileDownload, TResponseFileDownload>(Url.ATTACH_FILEDOWNLOAD, EBoardListAction.ATTACH_FILEDOWNLOAD),
};

export default actions;
