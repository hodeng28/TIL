interface FollowItem {
  idfollow: number;
  iduser: number;
  nickname: string;
  profilepath: string;
  isfollow: number;
  userinfo: string;
}

type ProcessedFollowItem = Pick<
  FollowItem,
  'idfollow' | 'iduser' | 'nickname' | 'profilepath' | 'userinfo'
> & {
  isFollowEachOther: 0 | 1;
  isFollowUser: 0 | 1;
};

interface BlockItem {
  idblock: number;
  iduser: number;
  nickname: string;
  profilepath: string;
}
