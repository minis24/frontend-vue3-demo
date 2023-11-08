// board list count API Request type==========
export type TRequestBoardListCnt = void;

// board list count API Response type=========
export type IResponseBoardListCnt = IBoardListCntObj;

export interface IBoardListCntObj {
	data: IData;
}

export interface IData {
	currentPageNo: string;
	endPage: string;
	lastPage: string;
	pageGroup: string;
	rowsPerPage: string;
	startPage: string;
	totalListCount: string;
}
