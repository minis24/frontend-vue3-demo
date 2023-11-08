// board update API Request type==========
export interface IRequestBoardUpdate {
  atchFileId: string;
  bbsId: string;
  ntceBgnde: string;
  ntceEndde: string;
  ntcrId: string;
  ntcrNm: string;
  nttCn: string;
  nttId: number;
  nttNo: number;
  nttSj: string;
  parnts: string;
  password: string;
  rdcnt: number;
}

// board update API Response type=========
export interface IResponseBoardUpdate {
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
