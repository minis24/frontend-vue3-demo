// board 첨부파일 download API Request type==========
export interface IRequestFileDownload {
  atchFileId: string;
  bbsId: string;
  nttId: number;
}

// board 첨부파일 download API Response type=========
export type TResponseFileDownload = void;

export interface IFileDownloadObj {
	data: any;
	list: any[];
}

