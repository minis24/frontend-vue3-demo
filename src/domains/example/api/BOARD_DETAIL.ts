// board detail API Request type==========
export type TRequestBoardDetail = void;

// board detail API Response type=========
export type IResponseBoardDetail = IBoardDetailObj;

export interface IBoardDetailObj {
	data: IData;
}

export interface IData {
	atchFileId: string;
	bbsAttrbCode: string;
	bbsId: string;
	bbsNm: string;
	bbsTyCode: string;
	fileAtchPosblAt: string;
	firstIndex: string;
	frstRegisterId: string;
	frstRegisterNm: string;
	frstRegisterPnttm: string;
	isExpired: string;
	lastIndex: string;
	lastUpdusrId: string;
	lastUpdusrNm: string;
	lastUpdusrPnttm: string;
	ntceBgnde: string;
	ntceEndde: string;
	ntcrId: string;
	ntcrNm: string;
	nttCn: string;
	nttId: string;
	nttNo: string;
	nttSj: string;
	pageIndex: string;
	pageSize: string;
	pageUnit: string;
	parnts: string;
	parntsSortOrdr: string;
	password: string;
	plusCount: string;
	posblAtchFileNumber: string;
	rdcnt: string;
	recordCountPerPage: string;
	replyAt: string;
	replyLc: string;
	replyPosblAt: string;
	rowNo: string;
	searchBgnDe: string;
	searchCnd: string;
	searchEndDe: string;
	searchUseYn: string;
	searchWrd: string;
	sortOrdr: string;
	subPageIndex: string;
	useAt: string;
}
