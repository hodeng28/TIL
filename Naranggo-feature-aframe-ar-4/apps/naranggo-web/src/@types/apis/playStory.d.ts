interface PlayStoryContentsData {
  intro: {
    blocks: Block[];
  };
  interactive: interactiveData;
  storyPoints: StoryPointWithBlockKey[];
}

interface interactiveData {
  pages: interactivePagesData[];
}

interface interactivePagesData {
  blocks: PagesBlock[];
  pageName: string;
}

interface PlayStoryPoint {
  Latitude: number;
  Longitude: number;
  PointName: string;
  enAddress: string;
  koAddress: string;
  RepresentativeImagePath: string;
  blocks: PictureBlockData[];
}

type Block = TextBlockData | PictureBlockData;

type PagesBlock =
  | TextBlockData
  | PictureBlockData
  | AvatarBlockData
  | ScoreBlockData
  | ScoreBlockData
  | GPSBlockData
  | ImagePatternBlockData
  | GotoBlockData
  | Selection4BlockData
  | Selection2BlockData
  | ItemAddBlockData
  | InfoBlockData
  | InfoCloseBlockData
  | FinishBlockData;

interface TextBlockData {
  mode: string;
  text: string;
  type: 'TextBlockData';
  audioPath: string;
  picturePath: string;
  isNowLoadingState: [0, 0];
}

interface PictureBlockData {
  src: string;
  type: 'PictureBlockData';
  loadingSrc: string;
  pictureTitle: string;
  isNowLoadingState: [0, 0];
}

interface AvatarBlockData {
  text: string;
  type: 'AvatarBlockData';
  avatarId: number;
  audioPath: string;
  audioFileName: string;
  isNowLoadingState: [0, 0];
}

interface AvatarData {
  avatarname: string;
  contents: string;
  imgpath: string;
}

interface ScoreBlockData {
  type: 'ScoreBlockData';
  score: number;
  scoreuniqueid: string;
  isNowLoadingState: [0, 0];
}

interface GPSBlockData {
  type: 'GPSBlockData';
  gotoPage: string;
  pointName: string;
  isNowLoadingState: [0, 0];
}

interface ImagePatternBlockData {
  type: 'ImagePatternBlockData';
  src: string;
  patternFound: string;
  patternCancel: string;
  isNowLoadingState: [0, 0];
}

interface GotoBlockData {
  type: 'GotoBlockData';
  gotoPage: string;
  isNowLoadingState: [0, 0];
}

interface Selection4BlockData extends Selection2BlockData {
  type: 'Selection4BlockData';
  answerC: string;
  answerD: string;
  gotoPageC: string;
  gotoPageD: string;
}

interface Selection2BlockData {
  type: 'Selection2BlockData';
  title: string;
  answerA: string;
  answerB: string;
  gotoPageA: string;
  gotoPageB: string;
  isNowLoadingState: [0, 0];
}

interface ItemAddBlockData {
  type: 'ItemAddBlockData';
  ItemDesc: string;
  ItemName: string;
  ImageIndex: number;
  isNowLoadingState: [0, 0];
  itemCustomImagePath: string;
}

interface InfoBlockData {
  type: 'InfoBlockData';
  text: string;
  isNowLoadingState: [0, 0];
}

interface InfoCloseBlockData {
  type: 'InfoCloseBlockData';
  isNowLoadingState: [0, 0];
}

interface FinishBlockData {
  type: 'FinishBlockData';
  isNowLoadingState: [0, 0];
}
