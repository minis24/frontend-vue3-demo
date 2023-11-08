// search API Request type==========
export interface IRequestLOGIN {
  userID: string;
  userPW: string;
}

// search API Response type=========
export type IResponseLOGIN = ILoginObj;

export interface ILoginObj {
  access_token?: string;
  refresh_token?: string;
}

//{
//	"access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoidGVzdElELTFAc2VjdWNlbi5jb20iLCJpc3MiOiJtaW5pczI0QGdtYWlsLmNvbSIsImV4cCI6MTY3Njk2MjY1MywiaWF0IjoxNjc2OTYyMDUzLCJ1c2VybmFtZSI6InRlc3RJRC0xQHNlY3VjZW4uY29tIn0.hAAi0EfKZMEhuRVYT5TQKVo9egV1sbzvmd7bb8--UpE",
//	"refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoidGVzdElELTFAc2VjdWNlbi5jb20iLCJpc3MiOiJtaW5pczI0QGdtYWlsLmNvbSIsImV4cCI6MTY3OTU1NDA1MywiaWF0IjoxNjc2OTYyMDUzLCJ1c2VybmFtZSI6InRlc3RJRC0xQHNlY3VjZW4uY29tIn0.M_Zcm6tbsjUyRqeOEagwyHysUx3ZFR_Se37AU6hRBMg"
//	}
