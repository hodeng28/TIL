import { useRouter } from 'next/router';

interface RemoteMessageData {
  iduser: number;
  idblog: number;
  idreply: string;
  idrereply: string;
  messagetype: string;
  // messagetype
  // 0 : 새글 알림 (해당 스토리로 이동)
  // 1 : 댓글 알림 (스토리의 댓글 페이지로 이동 후 댓글 포커싱)
  // 2 : 답글 알림 (스토리의 댓글 페이지로 이동 후 답글 포커싱)
  // 3 : 팔로잉 알림 (팔로잉 신청자의 프로필 페이지로 이동)
}

const usePushMessageRoute = () => {
  const router = useRouter();

  const messageRoute = (pushMessge: RemoteMessageData) => {
    if (!pushMessge) return;
    const { messagetype, idblog, iduser, idreply, idrereply } = pushMessge;

    switch (messagetype) {
      case '0':
        router.push(`/story/${idblog}`);
        break;
      case '1':
        router.push({
          pathname: `/story/${idblog}/comment`,
          query: { idreply }
        });
        break;
      case '2':
        router.push({
          pathname: `/story/${idblog}/comment`,
          query: { idrereply }
        });
        break;
      case '3':
        router.push(`/profile/${iduser}`);
        break;
      default:
        break;
    }
  };

  return { messageRoute };
};

export default usePushMessageRoute;
