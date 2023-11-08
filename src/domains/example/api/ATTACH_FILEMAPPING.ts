// AttachFileMapping API Request type==========
export interface IRequestAttachFileMapping {
  bbsId: string;
  nttId: string;
	atchFileId: string;
}

// AttachFileMapping API Response type=========
export type TResponseAttachFileMapping = IAttachFileMappingObj;

export interface IAttachFileMappingObj {
	data: any;
	list: any;
}

