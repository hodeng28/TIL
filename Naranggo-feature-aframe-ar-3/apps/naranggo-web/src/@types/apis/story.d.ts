interface StoryItem {
  idblog: number;
  contents: string;
  userId: number;
  title: string;
  nickname: string;
  profilepath: string;
  likecount: number;
  summary: string;
  lat: number;
  lng: number;
  representative: string;
  estimatedtime: number;
  createdtime: string;
  lastmodifiedtime: string;
  publicsetting: number;
  count: number;
  playable: 0 | 1;
  replycount: number;
  replycountsum: number;
  pointcount: number;
  distance: number;
  agecheck: number;
  isplan: number;
  isaudio: number;
  isofficial: 0 | 1 | 2;
  istourapi: number;
  idlikes: number;
  idscrap: number;
  iduser: number;
  iscomplete: 0 | 1;
  isscrap: 0 | 1;
  islike: 0 | 1;
  isfollow: 0 | 1;
  scrapcount: number;
  completedcount: number;
  completedcountsum: number;
}

interface TextBlockData {
  audioFileName: string;
  audioPath: string;
  isNowLoadingState: [0, 0];
  mode: string;
  picturePath: string;
  text: string;
  type: 'TextBlockData';
}

interface PictureBlockData {
  isNowLoadingState: [0, 0];
  loadingSrc: string;
  pictureTitle: string;
  src: string;
  type: 'PictureBlockData';
}

type Block = TextBlockData | PictureBlockData;

interface StoryPoint {
  id: string;
  Latitude: number;
  Longitude: number;
  PointName: string;
  RepresentativeImagePath: string;
  isRepresentativePoint: boolean;
  enAddress: string;
  koAddress: string;
  blocks: Block[];
  editorValue?: string;
}

interface StoryContents {
  interactive: {
    pages: unknown[];
  };
  intro: {
    blocks: Block[];
  };
  storyPoints: StoryPoint[];
}

interface StoryFilter {
  text: string;
  id: number;
  checked: boolean;
  filterType: number;
}

interface StoryDateFilter {
  text: string;
  id: number;
  checked: boolean;
  date: number;
}
