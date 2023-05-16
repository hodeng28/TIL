import theme from '@/utils/theme';
import { styled, Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { useQuery } from 'react-query';
import axios from '@/api/axiosClient';
import { useAtomValue } from 'jotai';
import loginProfileAtom from '@/atoms/loginProfileAtom';

interface AvatarBlockProps {
  block: AvatarBlockData;
}

const AvatarBlock = ({ block }: AvatarBlockProps) => {
  const TestAFrame = dynamic(() => import('../../../avatarPages/TestAFrame'));
  const ArLBSAFrame = dynamic(() => import('../../../avatarPages/ArLBSAFrame'));

  const { iduser, accesstoken } = useAtomValue(loginProfileAtom);
  const currentTime = Date.now();

  const avatarId = block.avatarId;

  const { data, isLoading, error } = useQuery(
    ['getAvatarData', avatarId],
    async () =>
      await axios.get(
        `/apis/getAvatar?accessId=${iduser}&accesstoken=${accesstoken}&idavatar=${avatarId}&timeStamp=${currentTime}`
      ),
    {
      refetchOnWindowFocus: false
    }
  );

  const avatarData = (data?.data.data as AvatarData).contents;
  if ((data && data.data.returnValue === -101) || isLoading || error) {
    return <></>;
  }

  return (
    <Wrapper>
      <AvatarWrapper>
        {/* <ArLBSAFrame /> */}
        <TestAFrame avatarData={avatarData} />
      </AvatarWrapper>
      <AvatarText>{block.text}</AvatarText>
    </Wrapper>
  );
};

export default AvatarBlock;

const Wrapper = styled(Stack)(() => ({
  position: 'fixed',
  top: '3.5rem',
  maxWidth: '466px',
  width: '100%',
  height: '100%',
  padding: '.5rem',
  backgroundColor: theme.palette.custom.light
}));

const AvatarWrapper = styled(Stack)(() => ({
  height: '65%',
  paddingTop: '5rem'
}));

const AvatarText = styled(Typography)(() => ({
  height: '10rem',
  padding: '1rem',
  maxHeight: '10rem',
  fontSize: '.875rem',
  whiteSpace: 'pre-wrap',
  overflowY: 'auto',
  zIndex: 1
}));
