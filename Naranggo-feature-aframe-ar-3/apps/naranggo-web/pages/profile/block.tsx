import { Stack, styled, Typography } from '@mui/material';
import BlockList from '@/components/List/BlockList';
import withAuth from '@/components/withAuth';
import Header from '@/components/Header/Header';
import { useRouter } from 'next/router';

import loginProfileAtom from '@/atoms/loginProfileAtom';
import { useAtomValue } from 'jotai';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';

import useInfiniteScrollWithQuery from '@/hooks/useInfiniteScrollWithQuery';
import { useInfiniteList } from '@/components/story/queries';
import {
  getBlockUserList,
  GetBlockUserListRequestParam
} from '@/components/follow/queries';

const Block: NextPageWithLayout = () => {
  const router = useRouter();
  const currentTime = Date.now();

  const { iduser: loggedInUserId, accesstoken } =
    useAtomValue(loginProfileAtom);

  const {
    data: blockList,
    refetch,
    ObservationComponent
  } = useInfiniteScrollWithQuery<BlockItem>(
    useInfiniteList<BlockItem, GetBlockUserListRequestParam>({
      queryKey: ['blockList'],
      apiParam: {
        lastIdBlock: -1,
        accessId: loggedInUserId,
        accesstoken: accesstoken,
        timeStamp: currentTime
      },
      queryFn: getBlockUserList,
      pagingRequestParamKey: 'lastIdBlock',
      pagingParamKey: 'idblock',
      pagingType: 'IdProperty',
      pagingParamStartValue: -1
    })
  );

  return (
    <Wrapper>
      <Header
        pageName="차단 계정 관리"
        options={{ back: true }}
        onClickBack={() => {
          router.back();
        }}
      />
      <InforWrapper>
        <StyledTypography>
          <NotificationImportantIcon />
          차단을 하게 되면
        </StyledTypography>
        <Typography>
          차단된 상대방이 작성한 스토리나 댓글이 보이지 않습니다.
        </Typography>
        <Typography>
          차단된 상대방은 내 스토리나 댓글을 볼 수 없습니다.
        </Typography>
        <Typography>차단된 상대방은 차단 여부를 알 수 없습니다.</Typography>
      </InforWrapper>
      {blockList?.length === 0 ? (
        <>
          <BlockCount>전체 0명</BlockCount>
          <NoFollowWrapper>
            <NoFollowTypography>차단한 계정이 없습니다.</NoFollowTypography>
          </NoFollowWrapper>
        </>
      ) : (
        <BlockList
          blockList={blockList}
          ObservationComponent={ObservationComponent}
          refetchBlockList={refetch}
        />
      )}
    </Wrapper>
  );
};

export default withAuth(Block);

const Wrapper = styled(Stack)(() => ({
  overflow: 'hidden',
  height: '100vh'
}));

const StyledTypography = styled(Typography)(() => ({
  display: 'flex',
  alignItems: 'center',

  '& .MuiSvgIcon-root': {
    marginRight: '.25rem'
  }
}));

const InforWrapper = styled(Stack)(() => ({
  margin: '1.25rem 1rem 1.25rem',
  paddingBottom: '1.25rem',
  borderBottom: '1px solid #ebedf0',
  '& .MuiTypography-root': {
    color: '#868686',
    fontSize: '.75rem'
  },
  '& .MuiTypography-root:not(:first-of-type)': {
    position: 'relative',
    padding: '.5rem 0 0 2rem'
  },

  '& .MuiTypography-root:first-of-type': {
    fontWeight: 'bold'
  }
}));

const NoFollowWrapper = styled(Stack)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translateX(-50%)',
  color: '#868686'
}));

const NoFollowTypography = styled(Typography)(() => ({
  fontSize: '.875rem'
}));

const BlockCount = styled(Typography)(() => ({
  paddingLeft: '1rem',
  color: '#212121'
}));
