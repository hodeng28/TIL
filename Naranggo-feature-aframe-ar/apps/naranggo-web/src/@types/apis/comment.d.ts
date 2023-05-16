interface Comment {
  contents: string;
  idreply: string; // 근데 number임 by 최대욱
  idrereply: string; // 근데 number임 by 최대욱
  iduser: number;
  isblock_user: 0 | 1;
  nickname: string;
  profilepath: string;
  reg_date: string;
  rereplycount: string;
}

interface CommentList {
  title: string;
  writeriduser: number;
  reply: Comment[];
}

interface CommentResponse {
  data: CommentList;
  message: string;
  returnValue: number;
}
