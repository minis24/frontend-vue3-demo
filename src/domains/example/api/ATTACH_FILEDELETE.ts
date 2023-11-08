// board attach file delete API Request type==========
export interface IRequestAttachFileDelete {
	bbsId: string,
  nttId: string;
	atchFileId: string;
}

// board attach file delete API Response type=========
export interface IResponseAttachFileDelete {
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
