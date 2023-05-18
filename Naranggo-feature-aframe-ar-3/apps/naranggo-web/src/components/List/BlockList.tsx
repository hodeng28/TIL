import Image from 'next/image';
import { Stack, Typography, styled, Button } from '@mui/material';
import { getProfileImage } from '@/utils/image';
import { useMutation } from 'react-query';
import axios from '@/api/axiosClient';
import { useAtomValue, useSetAtom } from 'jotai';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import modalInformationAtom from '@/atoms/modalInformationAtom';

interface BlockListProps {
  blockList?: BlockItem[];
  ObservationComponent: () => JSX.Element;
  refetchBlockList: () => void;
}

const BlockList = ({
  blockList,
  ObservationComponent,
  refetchBlockList
}: BlockListProps) => {
  const setModalInformation = useSetAtom(modalInformationAtom);

  const { iduser: loggedInUserId, accesstoken } =
    useAtomValue(loginProfileAtom);

  const { mutate: block } = useMutation({
    mutationFn: ({ iduser }: { iduser: number }) =>
      axios.post(`/apis/setUnBlock`, {
        iduser: iduser,
        accesstoken,
        accessId: loggedInUserId
      }),
    onSuccess: () => {
      refetchBlockList();
    }
  });

  const handleIsOpenBlockModal = (blockItem: BlockItem) => {
    setModalInformation({
      type: 'UNBLOCK_USER',
      nickname: blockItem.nickname,
      handleClickRightBtn: () => {
        block({ iduser: blockItem.iduser });
      }
    });
  };

  return (
    <>
      <BlockCount>전체 {blockList?.length}명</BlockCount>
      <BlockWrapper>
        {blockList?.map((blockItem: BlockItem, index) => {
          const { iduser, nickname, profilepath } = blockItem;

          return (
            <BlockListWrapper key={iduser}>
              <BlockImageWrapper>
                <ProfileWrapper>
                  <BlockImage
                    width={48}
                    height={48}
                    objectFit="cover"
                    objectPosition="center"
                    alt={nickname}
                    src={getProfileImage('profile', profilepath)}
                  />
                </ProfileWrapper>
              </BlockImageWrapper>
              <BlockNicknameTypography>{nickname}</BlockNicknameTypography>
              <BlockBtn onClick={() => handleIsOpenBlockModal(blockItem)}>
                <StyledBlockBtnTypo>차단해제</StyledBlockBtnTypo>
              </BlockBtn>

              {index > blockList.length - 10 ? <ObservationComponent /> : <></>}
            </BlockListWrapper>
          );
        })}
      </BlockWrapper>
    </>
  );
};
export default BlockList;

const BlockCount = styled(Typography)(() => ({
  padding: '0 0 .5rem 1rem',
  color: '#212121'
}));

const BlockWrapper = styled(Stack)(() => ({
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
}));

const BlockListWrapper = styled(Stack)(() => ({
  position: 'relative',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '.625rem'
}));

const BlockImageWrapper = styled(Stack)(() => ({
  flexDirection: 'row',

  '& span': {
    flex: '0 0 max-content'
  }
}));

const ProfileWrapper = styled(Stack)(() => ({
  border: '1px solid #fff',
  borderRadius: '50%'
}));

const BlockImage = styled(Image)(() => ({
  borderRadius: '50%'
}));

const BlockNicknameTypography = styled(Typography)(() => ({
  flex: 2,
  alignItems: 'center',
  width: '55%',
  margin: '0 86px 0 16px',
  padding: 0,
  textAlign: 'left',
  whiteSpace: 'nowrap',
  overflowX: 'hidden',
  textOverflow: 'ellipsis'
}));

const BlockBtn = styled(Button)(() => ({
  flex: '0 0 max-content',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  right: 0,
  fontSize: '.875rem',
  margin: '6px 8px',
  padding: 0,
  backgroundColor: '#736DEE',
  color: '#ffffff',
  borderRadius: '5px',

  '& .MuiTypography-root': {
    fontSize: '.875rem'
  },

  '&: hover': {
    backgroundColor: '#736DEE !important'
  }
}));

const StyledBlockBtnTypo = styled('div')(() => ({
  fontSize: '.875rem',
  padding: '2px 16px'
}));
