// board delete API Request type==========
export interface IRequestBoardDelete {
	bbsId: string,
  nttId: string;
}

// board delete API Response type=========
export type IResponseBoardDelete = IBoardDeleteObj;

export interface IBoardDeleteObj {
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
	frstRegisterNm: string;
}
