type ScrollEvent = UIEvent<HTMLDivElement> & { target: HTMLDivElement };

interface TextBlockDataWtihKey extends TextBlockData {
  blockId: string;
  src: string;
}

interface PictureBlockDataWithKey extends PictureBlockData {
  blockId: string;
}

type BlockWithKey = TextBlockDataWtihKey | PictureBlockDataWithKey;

interface CommentWithId extends Comment {
  commentId: string;
}

interface CommentWithChild extends CommentWithId {
  childComments: CommentWithId[];
}

type SelectedCommentToReply = Pick<CommentWithId, 'commentId' | 'nickname'>;

interface ActiveComment {
  nickname: string;
  idreply: string;
  idrereply: string;
  type:
    | 'Rereplying'
    | 'ReplyEditing'
    | 'RereplyEditing'
    | 'ReplyDelete'
    | 'RereplyDelete';
  priorText?: string;
}

type StoryPointWithBlockKey = Omit<StoryPoint, 'blocks'> & {
  blocks: BlockWithKey[];
};

type StoryPointInformation = {
  scrollYPosition: number;
  storyPointNodeHeight: number;
} & MapCoordinate;

interface MarkerToStoryPointInformation {
  [key: string]: StoryPointInformation;
}

interface ScrollPositionInformation {
  mainImageVisibility: number;
  commentListSectionPosition: number;
}
