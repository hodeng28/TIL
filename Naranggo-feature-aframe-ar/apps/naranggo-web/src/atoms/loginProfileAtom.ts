import { atom } from 'jotai';

export const initialLoginProfile = {
  iduser: 0,
  udid: '',
  nickname: '',
  userinfo: '',
  profilepath: '',
  gm: 0,
  fcmtoken: '',
  accountinfo: [],
  accesstoken: '',
  avatarfolderlist: [],
  avatarlist: []
};

const loginProfileAtom = atom<LoginProfile>(initialLoginProfile);

export default loginProfileAtom;
