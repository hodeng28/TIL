interface PlayStoryData extends PlayStoryCount {
  story: PlayStoryItemData[];
}

interface PlayStoryCount {
  allcount: number;
  completeallcount: number;
  category1count: number;
  complete1count: number;
  category2count: number;
  complete2count: number;
}

interface PlayStoryItemData {
  idblog: number;
  iduser: string;
  title: string;
  summary: string;
  lat: number;
  lng: number;
  representative: string;
  createdtime: string;
  estimatedtime: number;
  likecount: number;
  nickname: string;
  profilepath: string;
  replycountsum: number;
  iscomplete: 0 | 1;
  islike: number;
  isscrap: number;
  distance: number;
}
