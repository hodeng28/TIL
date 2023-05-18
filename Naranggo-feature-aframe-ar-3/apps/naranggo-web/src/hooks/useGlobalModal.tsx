import modalInformationAtom, {
  ModalInformationAtom
} from '@/atoms/modalInformationAtom';
import { sendMessageToDevice } from '@/utils/helpers';
import { useAtom, useSetAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { WEBVIEW_MESSAGE_TYPE } from '@naranggo/shared';
import { useRouter } from 'next/router';
import isHardwareBackButtonTriggeredAtom from '@/atoms/isHardwareBackButtonTriggeredAtom';
import styled from '@emotion/styled';
import { Stack, Typography } from '@mui/material';

type OriginModal = {
  isModalOpen: boolean;
  leftBtnName?: string;
  rightBtnName: string;
  message: string;
  TextComponent: JSX.Element;
  handleClickLeftBtn: (() => void) | null;
  handleClickRightBtn: (() => void) | null;
};

type Empty = typeof empty;

type DeviceSetting = {
  leftBtnName: '닫기';
  rightBtnName: '설정으로 이동';
  message: '권한이 허용되지 않아 이 기능을 사용할 수 없습니다. 앱 설정에서 권한을 허용해 주세요';
  handleClickRightBtn: () => void;
};

type ExitApp = {
  leftBtnName: '취소';
  rightBtnName: '확인';
  message: '나랑고를 종료 하시겠습니까?';
  handleClickRightBtn: () => void;
};

type Write = {
  leftBtnName: '취소';
  rightBtnName: '나가기';
  message: string;
  handleClickRightBtn: () => void;
};

type UnBlock = {
  leftBtnName: '취소';
  rightBtnName: '해제';
  message: string;
  handleClickRightBtn: () => void;
};

type Block = {
  leftBtnName: '취소';
  rightBtnName: '차단';
  message: '이 사용자의 모든 스토리와 댓글이 보이지 않게 됩니다.\n이 사용자를 차단하시겠습니까?';
  handleClickRightBtn: () => void;
};

type LinkAccount = {
  leftBtnName: '취소';
  rightBtnName: '로그인';
  message: string;
  handleClickLeftBtn: () => void;
  handleClickRightBtn: () => void;
};

type DeletePoint = {
  leftBtnName: '취소';
  rightBtnName: '삭제';
  message: '포인트를 삭제하시겠습니까?';
  handleClickRightBtn: () => void;
};

type DeleteAllAlerts = {
  leftBtnName: '취소';
  rightBtnName: '삭제';
  message: '전체 알림을 삭제하시겠습니까?';
  handleClickRightBtn: () => void;
};

type NeedLogin = {
  leftBtnName: '취소';
  rightBtnName: '확인';
  message: '로그인 후 이용 가능합니다. \n로그인하시겠습니까?';
  handleClickRightBtn: () => void;
};

type AndroidGPSsettings = {
  leftBtnName: '닫기';
  rightBtnName: '설정으로 이동';
  message: '위치 기능이 꺼져 있어 현재 위치를 알 수 없습니다. 정확한 위치 확인을 위하여 기기 설정 > 위치 기능을 "사용 중"으로 변경해 주세요';
  handleClickRightBtn: () => void;
};

type IosGPSSettings = {
  rightBtnName: '닫기';
  message: '위치 기능이 꺼져 있어 현재 위치를 알 수 없습니다. 정확한 위치 확인을 위하여 기기 설정 > 개인정보보호 및 보안 > 위치 기능을 "ON"으로 변경해 주세요';
  handleClickRightBtn: () => void;
};

type UnLinkAccount = {
  rightBtnName: '확인';
  message: '1개 이상의 서비스와 연동이 되어야 합니다.';
  handleClickRightBtn: () => void;
};

type LoginError = {
  rightBtnName: '확인';
  message: '일시적으로 오류가 발생하였습니다. \n잠시 후 다시 시도해 주시기 바랍니다.';
  handleClickRightBtn: () => void;
};

type Withdraw = {
  leftBtnName: '취소';
  rightBtnName: '확인';
  message: string;
  handleClickRightBtn: () => void;
};

type DeleteStory = {
  leftBtnName: '취소';
  rightBtnName: '삭제';
  message: '이 스토리를 삭제하시겠습니까?';
  handleClickRightBtn: () => void;
};

type ModalInformation =
  | Empty
  | DeviceSetting
  | ExitApp
  | Write
  | UnBlock
  | Block
  | LinkAccount
  | DeletePoint
  | DeleteAllAlerts
  | NeedLogin
  | AndroidGPSsettings
  | IosGPSSettings
  | UnLinkAccount
  | LoginError
  | Withdraw
  | DeleteStory;

const empty = {
  isModalOpen: false,
  leftBtnName: '',
  rightBtnName: '',
  message: '',
  handleClickRightBtn: null
};

const useGlobalModal = (): OriginModal => {
  const [kindOfGlobalModal, setKindOfGlobalModal] =
    useAtom(modalInformationAtom);
  const [modalInformation, setModalInformation] =
    useState<ModalInformation>(empty);
  const setIsHardwareBackButtonTriggered = useSetAtom(
    isHardwareBackButtonTriggeredAtom
  );
  const router = useRouter();

  const handleClickBtn = useCallback(
    (func?: () => void) => () => {
      func && func();
      setIsHardwareBackButtonTriggered(false);
      setModalInformation(empty);
      setKindOfGlobalModal(null);
    },
    [setIsHardwareBackButtonTriggered, setKindOfGlobalModal]
  );

  useEffect(() => {
    if (!kindOfGlobalModal) {
      return;
    }

    const { type } = kindOfGlobalModal;

    if (type === 'DEVICE_SETTINGS') {
      setModalInformation({
        leftBtnName: '닫기',
        rightBtnName: '설정으로 이동',
        message:
          '권한이 허용되지 않아 이 기능을 사용할 수 없습니다. 앱 설정에서 권한을 허용해 주세요',
        handleClickRightBtn: handleClickBtn(() => {
          sendMessageToDevice(WEBVIEW_MESSAGE_TYPE.PERMISSION_REQUEST, {
            permissionType: 'LOCATION',
            isRouteSettings: true
          });
        })
      });
      return;
    }

    if (type === 'EXIT_APP') {
      setModalInformation({
        leftBtnName: '취소',
        rightBtnName: '확인',
        message: '나랑고를 종료 하시겠습니까?',
        handleClickRightBtn: handleClickBtn(() => {
          sendMessageToDevice(WEBVIEW_MESSAGE_TYPE.EXIT_APP, true);
        })
      });
      return;
    }

    if (type === 'EXIT_NEW_WRITE' || type === 'EXIT_EDIT') {
      setModalInformation({
        leftBtnName: '취소',
        rightBtnName: '나가기',
        message:
          type === 'EXIT_NEW_WRITE'
            ? '작성중인 내용이 모두 사라집니다.\n그래도 이 페이지를 나가시겠습니까?'
            : '변경된 내용이 저장되지 않습니다.\n그래도 이 페이지를 나가시겠습니까?',
        handleClickRightBtn: handleClickBtn(() => {
          router.back();
          kindOfGlobalModal.handleClickRightBtn &&
            kindOfGlobalModal.handleClickRightBtn();
        })
      });
      return;
    }

    if (type === 'UNBLOCK_USER') {
      setModalInformation({
        leftBtnName: '취소',
        rightBtnName: '해제',
        message: '님을 차단하시겠어요?',
        handleClickRightBtn: handleClickBtn(
          kindOfGlobalModal.handleClickRightBtn
        )
      });
      return;
    }

    if (type === 'BLOCK_USER') {
      setModalInformation({
        leftBtnName: '취소',
        rightBtnName: '차단',
        message:
          '이 사용자의 모든 스토리와 댓글이 보이지 않게 됩니다.\n이 사용자를 차단하시겠습니까?',
        handleClickRightBtn: handleClickBtn(
          kindOfGlobalModal.handleClickRightBtn
        )
      });
      return;
    }

    if (type === 'LINK_ACCOUNT') {
      setModalInformation({
        leftBtnName: '취소',
        rightBtnName: '로그인',
        message: `이미 연동된 계정이 있습니다.\n\n ${kindOfGlobalModal.nickname}\n이 계정으로 로그인 하시겠습니까?`,
        handleClickLeftBtn: handleClickBtn(
          kindOfGlobalModal.handleClickLeftBtn
        ),
        handleClickRightBtn: handleClickBtn(
          kindOfGlobalModal.handleClickRightBtn
        )
      });
      return;
    }

    if (type === 'DELETE_POINT') {
      setModalInformation({
        leftBtnName: '취소',
        rightBtnName: '삭제',
        message: `포인트를 삭제하시겠습니까?`,
        handleClickRightBtn: handleClickBtn(
          kindOfGlobalModal.handleClickRightBtn
        )
      });
      return;
    }

    if (type === 'UNLINK_ACCOUNT') {
      setModalInformation({
        rightBtnName: '확인',
        message: '1개 이상의 서비스와 연동이 되어야 합니다.',
        handleClickRightBtn: handleClickBtn()
      });
      return;
    }

    if (type === 'DELETE_ALERT') {
      setModalInformation({
        leftBtnName: '취소',
        rightBtnName: '삭제',
        message: '전체 알림을 삭제하시겠습니까?',
        handleClickRightBtn: handleClickBtn(
          kindOfGlobalModal.handleClickRightBtn
        )
      });
      return;
    }

    if (type === 'NEED_LOGIN') {
      setModalInformation({
        leftBtnName: '취소',
        rightBtnName: '확인',
        message: '로그인 후 이용 가능합니다. \n로그인하시겠습니까?',
        handleClickRightBtn: handleClickBtn(
          kindOfGlobalModal.handleClickRightBtn
        )
      });
      return;
    }

    if (type === 'WITH_DRAW') {
      setModalInformation({
        leftBtnName: '취소',
        rightBtnName: '확인',
        message: `탈퇴 시등록한 스토리와 댓글이 모두 삭제되며 복구가 불가능합니다. \n정말 탈퇴하시겠습니까?`,
        handleClickRightBtn: handleClickBtn(
          kindOfGlobalModal.handleClickRightBtn
        )
      });
      return;
    }

    if (type === 'LOGIN_ERROR') {
      setModalInformation({
        rightBtnName: '확인',
        message:
          '일시적으로 오류가 발생하였습니다. \n잠시 후 다시 시도해 주시기 바랍니다.',
        handleClickRightBtn: handleClickBtn()
      });
      return;
    }

    if (type === 'AndroidGPSSettings') {
      setModalInformation({
        leftBtnName: '닫기',
        rightBtnName: '설정으로 이동',
        message:
          '위치 기능이 꺼져 있어 현재 위치를 알 수 없습니다. 정확한 위치 확인을 위하여 기기 설정 > 위치 기능을 "사용 중"으로 변경해 주세요',
        handleClickRightBtn: handleClickBtn(() => {
          sendMessageToDevice(WEBVIEW_MESSAGE_TYPE.ANDROID_GPS_SETTINGS, {
            platform: window.platform
          });
        })
      });
      return;
    }

    if (type === 'IosGPSSettings') {
      setModalInformation({
        rightBtnName: '닫기',
        message:
          '위치 기능이 꺼져 있어 현재 위치를 알 수 없습니다. 정확한 위치 확인을 위하여 기기 설정 > 개인정보보호 및 보안 > 위치 기능을 "ON"으로 변경해 주세요',
        handleClickRightBtn: handleClickBtn()
      });
      return;
    }

    if (type === 'DELETE_STORY') {
      setModalInformation({
        leftBtnName: '취소',
        rightBtnName: '삭제',
        message: '이 스토리를 삭제하시겠습니까?',
        handleClickRightBtn: handleClickBtn(
          kindOfGlobalModal.handleClickRightBtn
        )
      });
    }
  }, [
    kindOfGlobalModal,
    router,
    handleClickBtn,
    setIsHardwareBackButtonTriggered,
    setKindOfGlobalModal
  ]);

  return {
    handleClickLeftBtn: handleClickBtn(),
    ...modalInformation,
    isModalOpen: !!kindOfGlobalModal,
    TextComponent: getTextComponent(modalInformation, kindOfGlobalModal)
  };
};

export default useGlobalModal;

const getTextComponent = (
  modalInformation: ModalInformation,
  kindOfGlobalModal: ModalInformationAtom
) => {
  if (kindOfGlobalModal?.type === 'UNBLOCK_USER') {
    return (
      <ModalText>
        <NickNameText>{kindOfGlobalModal.nickname}</NickNameText>님을 차단
        해제하시겠습니까?
      </ModalText>
    );
  }

  if (kindOfGlobalModal?.type === 'WITH_DRAW') {
    return (
      <ModalText>
        <Typography>
          탈퇴 시 <RedText>등록한 스토리와 댓글이 모두 삭제</RedText>되며
          <RedText> 복구가 불가능</RedText>합니다.
        </Typography>
        <Typography>정말 탈퇴하시겠습니까?</Typography>
      </ModalText>
    );
  }

  return <ModalText>{modalInformation.message}</ModalText>;
};

const ModalText = styled(Stack)(() => ({
  whiteSpace: 'pre-line'
}));

const NickNameText = styled(Typography)(() => ({
  display: 'contents',
  fontWeight: 'bold'
}));

const RedText = styled('span')(() => ({
  whiteSpace: 'break-spaces',
  color: '#ff4c3b'
}));
