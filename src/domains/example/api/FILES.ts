// board 첨부파일 리스트 API Request type==========
export interface IRequestFiles {
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

// board 첨부파일 리스트 API Response type=========
export type TResponseFiles = IFilesObj;

export interface IFilesObj {
	data: IData;
	list: IList[];
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

export interface IList {
	atchFileId: string
	chdDt: string;
	chgId: string;
	chgName: string;
	endRow: string;
	fileCn: string;
	fileExtSn: string;
	fileSize: string;
	fileSn: string;
	fileStreCours: string;
	orignlFileNm: string;
	pno: string;
	ppg: string;
	redirectUrl: string;
	regDt: string;
	regId: string;
	regName: string;
	rpp: string;
	rtnCode: string;
	rtnMsg: string;
	startRow: string;
	streFileNm: string;
	totalSearchCnt: string;
}
