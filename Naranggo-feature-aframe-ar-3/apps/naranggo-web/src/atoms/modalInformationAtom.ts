import { atom } from 'jotai';

export const KIND_THAT_NOT_HANDLE_BUTTON = {
  DEVICE_SETTINGS: 'DEVICE_SETTINGS',
  EXIT_APP: 'EXIT_APP',
  UNLINK_ACCOUNT: 'UNLINK_ACCOUNT',
  LOGIN_ERROR: 'LOGIN_ERROR'
};

export type ModalInformationAtom =
  | null
  | {
      type: keyof typeof KIND_THAT_NOT_HANDLE_BUTTON;
    }
  | {
      type: 'UNBLOCK_USER';
      nickname: string;
      handleClickRightBtn: () => void;
    }
  | {
      type: 'BLOCK_USER';
      handleClickRightBtn: () => void;
    }
  | {
      type: 'LINK_ACCOUNT';
      nickname: string;
      handleClickLeftBtn: () => void;
      handleClickRightBtn: () => void;
    }
  | {
      type: 'NEED_LOGIN';
      handleClickRightBtn?: () => void;
    }
  | {
      type: 'DELETE_POINT';
      handleClickRightBtn: () => void;
    }
  | {
      type: 'DELETE_ALERT';
      handleClickRightBtn: () => void;
    }
  | {
      type: 'WITH_DRAW';
      handleClickRightBtn: () => void;
    }
  | {
      type: 'AndroidGPSSettings';
    }
  | {
      type: 'IosGPSSettings';
    }
  | {
      type: 'EXIT_NEW_WRITE' | 'EXIT_EDIT';
      handleClickRightBtn?: () => void;
    }
  | {
      type: 'DELETE_STORY';
      handleClickRightBtn: () => void;
    };

export type AllModalTypes = Exclude<ModalInformationAtom, null>['type'];

const modalInformationAtom = atom<ModalInformationAtom>(null);

export default modalInformationAtom;
