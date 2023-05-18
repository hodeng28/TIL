import loginProfileAtom from '@/atoms/loginProfileAtom';
import snackBarAtom from '@/atoms/snackBarAtom';
import { isPreviewPageAtom } from '@/atoms/storyWriteAtom';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';
import { useMutation, useQueryClient } from 'react-query';
import { CommentButton } from '../Button/CommentButton';
import { LikeButton } from '../Button/LikeButton';
import { ScrapButton } from '../Button/ScrapButton';
import axios from '@/api/axiosClient';
import produce from 'immer';
import { useRouter } from 'next/router';
import { STORY_READ_PAGE_CSS } from '@/consts/css';
import DisplayContainer from '../login/DisplayContainer';
import { LinkShareButton } from '../Button/LinkShareButton';

interface StoryReadButtonGroupProps {
  idblog?: number;
  iduser?: number;
  likecount?: number;
  replycountsum?: number;
  isscrap?: 0 | 1;
  islike?: 0 | 1;
  title?: string;
  playable?: 0 | 1;
}

const StoryReadButtonGroup = ({
  idblog,
  likecount,
  replycountsum,
  isscrap,
  islike,
  iduser,
  playable
}: StoryReadButtonGroupProps) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { iduser: accessId, accesstoken } = useAtomValue(loginProfileAtom);

  const { mutate: likeStory } = useMutation(
    async () => {
      await axios.post(`/apis/setLike`, {
        accesstoken,
        accessId,
        idblog
      });
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries(['getStoryRead', idblog]);

        const snapShotOfPreviousData = queryClient.getQueryData<
          ApiResponse<StoryItem>
        >(['getStoryRead', idblog]);

        if (snapShotOfPreviousData) {
          const { islike, likecount } = snapShotOfPreviousData.data;
          queryClient.setQueryData<ApiResponse<StoryItem>>(
            ['getStoryRead', idblog],
            produce(snapShotOfPreviousData, (draft) => {
              draft.data.islike = islike === 1 ? 0 : 1;
              draft.data.likecount =
                islike === 1 ? likecount - 1 : likecount + 1;
            })
          );
        }

        return {
          snapShotOfPreviousData
        };
      }
    }
  );

  const { mutate: setScrap } = useMutation(
    async () =>
      await axios.post(`/apis/setScrap`, {
        accesstoken,
        accessId,
        idblog
      }),
    {
      onMutate: async () => {
        await queryClient.cancelQueries(['getStoryRead', idblog]);

        const snapShotOfPreviousData = queryClient.getQueryData<
          ApiResponse<StoryItem>
        >(['getStoryRead', idblog]);

        if (snapShotOfPreviousData) {
          queryClient.setQueryData<ApiResponse<StoryItem>>(
            ['getStoryRead', idblog],
            produce(snapShotOfPreviousData, (draft) => {
              draft.data.isscrap =
                snapShotOfPreviousData.data.isscrap === 1 ? 0 : 1;
            })
          );
        }

        return {
          snapShotOfPreviousData
        };
      }
    }
  );

  const isPreviewPage = useAtomValue(isPreviewPageAtom);
  const setSnackBar = useSetAtom(snackBarAtom);

  const handleShowPreviewMessage = () =>
    setSnackBar({
      isSnackBarOpen: true,
      message: '미리보기 화면입니다.',
      vertical: 'bottom'
    });

  const handleClickLikeButton = () => {
    likeStory();
  };

  const handleClickScrapButton = () => {
    setScrap();
  };

  const handleClickCommentButton = () => {
    router.push({
      pathname: `/story/${idblog}/comment`,
      query: { storyWriterId: iduser, playable }
    });
  };

  return (
    <Wrapper>
      <LeftButtonGroup>
        <DisplayContainer modal>
          <LikeButton
            islike={isPreviewPage ? 0 : (islike as 0 | 1)}
            likecount={isPreviewPage ? 0 : (likecount as number)}
            onClick={
              isPreviewPage ? handleShowPreviewMessage : handleClickLikeButton
            }
          />
        </DisplayContainer>
        <CommentButton
          replycountsum={isPreviewPage ? 0 : replycountsum || 0}
          onClick={
            isPreviewPage ? handleShowPreviewMessage : handleClickCommentButton
          }
        />
      </LeftButtonGroup>
      <RightButtonGroup>
        <LinkShareButton />
        <DisplayContainer>
          <ScrapButton
            isScrapped={isscrap as 0 | 1}
            isPreviewPage={isPreviewPage}
            onClick={
              isPreviewPage ? handleShowPreviewMessage : handleClickScrapButton
            }
          />
        </DisplayContainer>
      </RightButtonGroup>
    </Wrapper>
  );
};

export default StoryReadButtonGroup;

const Wrapper = styled(Box)(() => ({
  position: 'sticky',
  bottom: 0,
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 1rem',
  boxShadow: '0 -0.1px 2px 0.1px #cfcfcf',
  margin: '1rem 0 0 0',
  height: STORY_READ_PAGE_CSS.HEIGHT.BUTTON_GROUP
}));

const LeftButtonGroup = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',

  '& button': {
    margin: 0,
    padding: '8px 8px 8px 0',
    borderRadius: 'initial'
  }
}));
const RightButtonGroup = styled(Box)(() => ({}));
