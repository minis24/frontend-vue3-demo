export interface IRequestSEARCH {
  query: string;
  tags: string;
};
// export interface IResponseNEWS {
//   // ..
// }

export interface IAuthor {
  matchLevel: string;
  matchedWords: any[];
  value: string;
}

export interface I_highlightResult {
  author: IAuthor;
  title: IAuthor;
  url: IAuthor;
}

export interface IHits {
  author: string;
  comment_text: string | null;
  created_at: string;
  created_at_i: number;
  num_comments: number;
  objectID: string;
  parent_id: number | null;
  points: number;
  relevancy_score: number;
  story_id: string;
  story_text: string;
  story_title: string;
  story_url: string;
  title: string;
  url: string;
  _highlightResult: I_highlightResult;
  _tags: string[];
}

export interface ISearchObj {
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  hits: IHits[];
  hitsPerPage: number;
  nbHits: number;
  nbPages: number;
  page: number;
  params: string;
  processingTimeMS: number;
  query: string;
  renderingContent: any;
}

export type IResponseSEARCH = ISearchObj;
