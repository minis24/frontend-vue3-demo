// AttachFileList API Request type==========
export interface IRequestAttachFileList {
  bbsId: string;
  nttId: string;
	file: any
}

// AttachFileList API Response type=========
export type TResponseAttachFileList = IAttachFileListObj;

export interface IAttachFileListObj {
	data: any;
	list: any;
}

