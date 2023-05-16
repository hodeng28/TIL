interface LoginParams {
  division: number; // 게스트 : 0 구글 : 1
  udid?: string; // 디바이스 아이디
  idaccount: string; // 게스트는 없음 구글은 구글에서 주는 값을 씀
  fcmtoken: string; // 디바이스
}

interface LoginProfile {
  iduser: number;
  udid: string;
  nickname: string;
  userinfo: string;
  profilepath: string;
  gm: number;
  fcmtoken: string;
  accountinfo: number[];
  accesstoken: string;
  avatarfolderlist: AvatarFolderList[];
  avatarlist: AvatarList[];
}

interface AccountLinkRequestParam {
  platform_type: number;
  idaccount: string;
}

interface AccountLinkResponse {
  nickname: string;
}

type AccountUnLinkRequestParam = {
  platform_type: number;
} & AccessInfo;

interface AccountUnLinkResponse {
  accountinfo: number[];
  lastlinkaccountinfo: Lastlinkaccountinfo;
}

interface Lastlinkaccountinfo {
  division: LoginType;
  idaccount: string;
}

type AccountCreateRequestParam = {
  platform_type: number;
  idaccount: string;
  tp: string;
  fp: string;
};
