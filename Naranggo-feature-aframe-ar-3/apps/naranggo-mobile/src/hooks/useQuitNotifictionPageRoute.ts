import { useEffect, useState } from 'react';

// interface RemoteNotification {
//   android: any;
//   body: string;
//   title: string;
// }

// interface RemoteMessageData {
//   iduser: number;
//   idblog: number;
//   idreply: string;
//   idrereply: string;
//   messagetype: number;
//   // messagetype
//   // 0 : 새글 알림 (해당 스토리로 이동)
//   // 1 : 댓글 알림 (스토리의 댓글 페이지로 이동 후 댓글 포커싱)
//   // 2 : 답글 알림 (스토리의 댓글 페이지로 이동 후 답글 포커싱)
//   // 3 : 팔로잉 알림 (팔로잉 신청자의 프로필 페이지로 이동)
// }

// export interface RemoteMessage {
//   notification: RemoteNotification;
//   sentTime: number;
//   data: RemoteMessageData;
//   from: string;
//   messageId: string;
//   ttl: number;
//   collapseKey: string;
// }

// 활성화 된 Foreground 상태, 앱을 이용 중일 때,
// 비 활성화된 Background 상태, 홈버튼 을 누르는 등 상태 (종료된 상태와 다르다. 작업관리자에서 확인 가능한 경우)
// 앱이 종료된 상태 Quit 로 나누어 생각할 수 있다.

const useQuitNotifictionPageRoute = () => {
  const [notifictionPagePath, setNotifictionPagePath] = useState('');
  const message = global.remoteMessage;

  useEffect(() => {
    if (!message) return;

    const { messagetype, idblog, iduser, idreply, idrereply } =
      global.remoteMessage.data;

    switch (messagetype) {
      case '0': // 새 글
        setNotifictionPagePath(`story/${idblog}`);
        break;
      case '1': // 댓글
        setNotifictionPagePath(`story/${idblog}/comment?idreply=${idreply}`);
        break;
      case '2': // 답글
        setNotifictionPagePath(
          `story/${idblog}/comment?idrereply=${idrereply}`
        );
        break;
      case '3': // 팔로잉
        setNotifictionPagePath(`profile/${iduser}`);
        break;
      default:
        setNotifictionPagePath('');
        break;
    }
  }, [message]);

  return { notifictionPagePath };
};

export default useQuitNotifictionPageRoute;
