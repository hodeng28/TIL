import { Avatar, Stack, styled, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { showDate } from '@/utils/time';
import { getProfileImage } from '@/utils/image';
import { useDelAlert } from '../follow/queries';
import { useAtomValue } from 'jotai';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import { useRouter } from 'next/router';

interface AlertListProps {
  alertList?: AlertItem[];
  ObservationComponent: () => JSX.Element;
  alarmRefetching: () => void;
}

const AlertList = ({
  alertList,
  ObservationComponent,
  alarmRefetching
}: AlertListProps) => {
  const router = useRouter();
  const { accesstoken, iduser: loggedInUserId } =
    useAtomValue(loginProfileAtom);

  const { mutate: delAlert } = useDelAlert();

  const handleClickDeleteAlert = (idalert: number) => {
    return delAlert(
      {
        idalert: idalert,
        accesstoken,
        accessId: loggedInUserId
      },
      {
        onSuccess: alarmRefetching
      }
    );
  };

  const getMessage = (
    alerttype: number,
    nickname: string,
    title: string,
    idblog: number,
    alertIdUser: number,
    idreply: number,
    idrereply: number,
    reply_contents: string,
    rereply_contents: string
  ) => {
    switch (alerttype) {
      case 0:
        return {
          text: `${nickname}님이 새 스토리를 올렸습니다.`,
          subText: `${title}`,
          link: `/story/${idblog}`
        };
      case 1:
        return {
          text: `${nickname}님이 댓글을 남겼습니다.`,
          subText: `${reply_contents}`,
          link: {
            pathname: `/story/${idblog}/comment/`
          }
        };
      case 2:
        return {
          text: `${nickname}님이 회원님을 팔로우하기 시작했습니다.`,
          subText: '',
          link: `/profile/${alertIdUser}`
        };
      case 3:
        return {
          text: `${nickname}님이 답글을 남겼습니다.`,
          subText: `${rereply_contents}`,
          link: {
            pathname: `/story/${idblog}/comment`
          }
        };
      default:
        return { text: '', subText: '' };
    }
  };

  return (
    <Wrapper>
      {alertList?.map((alertItem: AlertItem, index) => {
        const {
          from_profilepath,
          nickname,
          title,
          reg_date,
          alerttype,
          idalert,
          reply_contents,
          rereply_contents,
          idblog,
          iduser: alertIdUser,
          idreply,
          idrereply
        } = alertItem;

        const { text, subText, link } = getMessage(
          alerttype,
          nickname,
          title,
          idblog,
          alertIdUser,
          idreply,
          idrereply,
          reply_contents,
          rereply_contents
        );

        return (
          <AlerListWrapper key={idalert}>
            <AvatarWrapper>
              <StyledAvatar
                alt={nickname}
                src={
                  from_profilepath &&
                  getProfileImage('profile', from_profilepath)
                }
                onClick={() => {
                  router.push(`/profile/${alertIdUser}`);
                }}
              />
            </AvatarWrapper>
            <TextWrapper
              onClick={() => {
                if (link) {
                  router.push(link);
                }
              }}
            >
              <Text>{text}</Text>
              <SubText>{subText}</SubText>
              <DateContents>{reg_date && showDate(reg_date)}</DateContents>
            </TextWrapper>
            <DeleteIcon onClick={() => handleClickDeleteAlert(idalert)} />
            {index > alertList.length - 10 ? <ObservationComponent /> : <></>}
          </AlerListWrapper>
        );
      })}
    </Wrapper>
  );
};
export default AlertList;

const Wrapper = styled(Stack)(() => ({
  padding: '.5rem .5rem 0',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
}));

const AvatarWrapper = styled(Stack)(() => ({
  marginRight: '.5rem',
  border: '1px solid #fff',
  borderRadius: '50%',
  placeSelf: 'flex-start'
}));

const AlerListWrapper = styled(Stack)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  margin: '.5rem 0',
  paddingBottom: '.5rem',
  cursor: 'pointer',

  '&:not(:last-of-type)': {
    borderBottom: '1px solid #ebedf0'
  }
}));

const StyledAvatar = styled(Avatar)(() => ({}));

const TextWrapper = styled(Stack)(() => ({
  flex: 1,
  justifyContent: 'space-around',
  lineHeight: 1.2
}));

const Text = styled(Typography)(() => ({
  fontSize: '0.875rem',
  color: '#000000'
}));

const SubText = styled(Typography)(() => ({
  display: 'contents',
  fontSize: '12px',
  color: '#868686'
  // lineClamp: 2,
  // whiteSpace: 'nowrap',
  // overflow: 'hidden',
  // textOverflow: 'ellipsis',
}));

const DateContents = styled(Stack)(() => ({
  fontSize: '12px',
  color: '#868686'
}));

const DeleteIcon = styled(ClearIcon)(() => ({
  width: '1.25rem',
  height: '1.25rem',
  margin: '.5rem',
  fontSize: '.875rem',
  color: '#868686',
  cursor: 'pointer'
}));
