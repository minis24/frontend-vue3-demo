// board list API Request type==========
export type TRequestBoardList = void;

// board list API Response type=========
export type IResponseBoardList = IBoardListObj;


export interface IBoardListObj {
	data: IData;
	list: IBoardList[];
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

export interface IBoardList {
	atchFileId: string;
	bbsId: string;
	frstRegisterId: string;
	frstRegisterPnttm: string;
	lastUpdusrId: string;
	lastUpdusrPnttm: string;
	ntceBgnde: string;
	ntceEndde: string;
	ntcrId: string;
	ntcrNm: string;
	nttCn: string;
	nttId: string;
	nttNo: string;
	nttSj: string;
	parnts: string;
	password: string;
	rdcnt: string;
	replyAt: string;
	replyLc: string;
	sortOrdr: string;
	useAt: string;
	searchBgnDe: string;
	searchCnd: string;
	searchEndDe: string;
	searchWrd: string;
	searchUseYn: string;
	pageIndex: string;
	pageUnit: string;
	pageSize: string;
	firstIndex: string;
	lastIndex: string;
	recordCountPerPage: string;
	rowNo: string;
	frstRegisterNm: string;
	lastUpdusrNm: string;
	isExpired: string;
	parntsSortOrdr: string;
	bbsTyCode: string;
	bbsAttrbCode: string;
	bbsNm: string;
	fileAtchPosblAt: string;
	posblAtchFileNumber: string;
	replyPosblAt: string;
	plusCount: string;
	subPageIndex: string;
}
