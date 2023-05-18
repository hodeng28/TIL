import { useState, MouseEvent, useEffect, useRef, useCallback } from 'react';
import { Box, IconButton, Menu, styled, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReportModal, {
  ReportModalType,
  ReportParamOption
} from '@/components/Modal/ReportModal';
import useReport from '@/components/Modal/useReport';
import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import axios from '@/api/axiosClient';
import { useRouter } from 'next/router';
import produce from 'immer';
import snackBarAtom from '@/atoms/snackBarAtom';
import { useAtom, useSetAtom } from 'jotai';
import menuAnchorElAtom from '@/atoms/menuAcholElAtom';
import { BaseModal } from '@naranggo/storybook';
import modalInformationAtom from '@/atoms/modalInformationAtom';

// // todo: 재사용성 높게 수정하기 / comment에 있는 더보기메뉴도 변경하기
// interface MoreButtonProps {
//   options?: {
//     edit?: boolean;
//     remove?: boolean;
//     report?: boolean;
//     block?: boolean;
//     hide?: boolean;
//     scrap?: boolean;
//     favorite?: boolean;
//     following?: boolean;
//   };
// }

interface MoreButtonProps {
  userId: number;
  loggedInUserId: number;
  isscrap?: number;
  accesstoken?: string;
  idblog?: number;
  isofficial?: number;
  type: ReportModalType;
  buttonColor?: 'grey' | 'white';
  reportParamOptions: ReportParamOption;
  queryKey?: string | string[];
  onRefetch?: (id?: number) => void;
  setSelectMarkerId?: (id?: number) => void;
}

const MoreButton = ({
  userId,
  loggedInUserId,
  isscrap,
  idblog,
  isofficial,
  onRefetch,
  accesstoken,
  type,
  queryKey,
  buttonColor,
  setSelectMarkerId,
  reportParamOptions: options
}: MoreButtonProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useAtom(menuAnchorElAtom);
  const achorElRef = useRef<HTMLButtonElement>();
  const setModalInformation = useSetAtom(modalInformationAtom);
  const handleCloseMenu = useCallback(() => setAnchorEl(null), [setAnchorEl]);

  const open = Boolean(anchorEl === achorElRef.current);
  const setSnackBar = useSetAtom(snackBarAtom);
  const { isReportModalOpen, handleOpenReportModal, handleCloseReportModal } =
    useReport();

  const handleClickMoreBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    achorElRef.current = e.currentTarget;
    setAnchorEl(e.currentTarget);
  };

  const handleCloseModal = (e?: MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    setIsModalOpen(false);
  };

  const { mutate: deleteStory } = useMutation(
    'deleteStory',
    async () =>
      await axios.delete(
        `/apis/delStory?idblog=${idblog}&accessId=${loggedInUserId}&accesstoken=${accesstoken}`
      ),
    {
      onMutate: async () => {
        if (!queryKey) return;

        await queryClient.cancelQueries(queryKey);

        if (queryKey[0] === 'getNearStoryList') {
          const snapShotOfPreviousData =
            queryClient.getQueryData<StoryItem[]>(queryKey);

          if (snapShotOfPreviousData) {
            queryClient.setQueryData<StoryItem[]>(
              queryKey,
              snapShotOfPreviousData.filter(
                (storyItem) => storyItem.idblog !== idblog
              )
            );
          }
        } else {
          const snapShotOfPreviousData =
            queryClient.getQueryData<InfiniteData<StoryItem[]>>(queryKey);

          if (snapShotOfPreviousData) {
            queryClient.setQueryData<InfiniteData<StoryItem[]>>(
              queryKey,
              produce(snapShotOfPreviousData, (draft) => {
                draft.pages = snapShotOfPreviousData.pages.map((page) => {
                  return page.filter((item) => item.idblog !== idblog);
                });
              })
            );
          }
        }
      },
      onSuccess() {
        setSelectMarkerId && setSelectMarkerId(idblog);
      }
    }
  );
  const { mutate: setScrap } = useMutation(
    async () =>
      await axios.post(`/apis/setScrap`, {
        accesstoken,
        accessId: loggedInUserId,
        idblog
      }),
    {
      onMutate: async () => {
        if (!queryKey) return;

        await queryClient.cancelQueries(queryKey);

        if (queryKey[0] === 'getNearStoryList') {
          const snapShotOfPreviousData =
            queryClient.getQueryData<StoryItem[]>(queryKey);

          if (snapShotOfPreviousData) {
            queryClient.setQueryData<StoryItem[]>(
              queryKey,
              produce(snapShotOfPreviousData, (draft) => {
                for (let i = 0; i < draft.length; i++) {
                  const target = draft[i];

                  if (target.idblog === idblog) {
                    draft[i].isscrap = draft[i].isscrap === 1 ? 0 : 1;
                  }
                }
              })
            );
          }
        } else if (queryKey === 'scrapList') {
          const snapShotOfPreviousData =
            queryClient.getQueryData<InfiniteData<StoryItem[]>>(queryKey);

          if (snapShotOfPreviousData) {
            queryClient.setQueryData<InfiniteData<StoryItem[]>>(
              queryKey,
              produce(snapShotOfPreviousData, (draft) => {
                const newData = snapShotOfPreviousData.pages.map((page) => {
                  return page.filter((item) => item.idblog !== idblog);
                });

                draft.pages = newData;
              })
            );
          }
        } else {
          const snapShotOfPreviousData =
            queryClient.getQueryData<InfiniteData<StoryItem[]>>(queryKey);

          if (snapShotOfPreviousData) {
            queryClient.setQueryData<InfiniteData<StoryItem[]>>(
              queryKey,
              produce(snapShotOfPreviousData, (draft) => {
                const newData = snapShotOfPreviousData.pages.map((page) => {
                  return page.map((item) => {
                    if (item.idblog === idblog) {
                      return {
                        ...item,
                        isscrap: item.isscrap === 1 ? 0 : 1
                      };
                    }
                    return item;
                  });
                });

                draft.pages = newData as StoryItem[][];
              })
            );
          }
        }
      }
    }
  );

  const handleClickRemoveBtnInMenu = () => {
    handleCloseMenu();
    setModalInformation({
      type: 'DELETE_STORY',
      handleClickRightBtn: () => {
        setSnackBar({
          isSnackBarOpen: true,
          message: '스토리가 삭제되었습니다.',
          vertical: 'bottom'
        });

        deleteStory();
      }
    });
  };

  const handleClickScrapBtnInMenu = () => {
    setScrap();
    setSnackBar({
      isSnackBarOpen: true,
      message:
        isscrap === 1 ? '스크랩이 해제 되었습니다.' : '스크랩 되었습니다',
      vertical: 'bottom'
    });
    handleCloseMenu();
  };

  const handleClickEditBtnInMenu = () => {
    handleCloseMenu();
    router.push({
      pathname: '/story/write',
      query: { storyId: idblog, beforePage: 'list' }
    });
  };

  const handleClickReportBtnInMenu = () => {
    handleCloseMenu();
    handleOpenReportModal();
  };

  const handleClickCommentRemoveBtnInModal = () => {
    handleCloseMenu();
    handleCloseModal();
  };

  useEffect(() => {
    if (anchorEl) {
      window.addEventListener('touchstart', handleCloseMenu);
      window.addEventListener('wheel', handleCloseMenu);
    }

    return () => {
      window.removeEventListener('touchstart', handleCloseMenu);
      window.removeEventListener('wheel', handleCloseMenu);
    };
  }, [anchorEl, handleCloseMenu]);

  const MoreMenu = [
    userId === loggedInUserId && (
      <MenuWrapper
        key="edit"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
        }}
      >
        <MenuItemWrapper>
          <MenuItem onClick={handleClickEditBtnInMenu}>수정</MenuItem>
          <MenuItem onClick={handleClickRemoveBtnInMenu}>삭제</MenuItem>
          <MenuItem onClick={handleClickScrapBtnInMenu}>
            {isscrap === 1 ? '스크랩 취소' : '스크랩'}
          </MenuItem>
        </MenuItemWrapper>
      </MenuWrapper>
    ),
    userId !== loggedInUserId && (
      <MenuWrapper
        key="report"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
        }}
      >
        <MenuItemWrapper>
          {isofficial === 0 && (
            <MenuItem onClick={handleClickReportBtnInMenu}>신고</MenuItem>
          )}
          <MenuItem onClick={handleClickScrapBtnInMenu}>
            {isscrap === 1 ? '스크랩 취소' : '스크랩'}
          </MenuItem>
        </MenuItemWrapper>
      </MenuWrapper>
    )
  ];

  const TwoOptionsModalInMenu = [
    userId !== loggedInUserId && !idblog && (
      <BaseModal
        key="block"
        isModalOpen={isModalOpen}
        leftBtnName="취소"
        rightBtnName="삭제"
        onClickLeftBtn={handleCloseModal}
        onClickRightBtn={handleClickCommentRemoveBtnInModal}
        onCloseModal={handleCloseModal}
      >
        <BlockTextInModal>
          <Typography>
            이 사용자의 모든 스토리와 댓글이 보이지 않게 됩니다.
          </Typography>
          <Typography sx={{ pt: '1rem' }}>
            이 사용자를 차단하시겠습니까?
          </Typography>
        </BlockTextInModal>
      </BaseModal>
    ),
    userId === loggedInUserId && !idblog && (
      <BaseModal
        key="reply"
        isModalOpen={isModalOpen}
        leftBtnName="취소"
        rightBtnName="삭제"
        onClickLeftBtn={handleCloseModal}
        onClickRightBtn={handleClickCommentRemoveBtnInModal}
        onCloseModal={handleCloseModal}
      >
        댓글을 삭제하시겠습니까?
      </BaseModal>
    )
  ];

  return (
    <>
      <ButtonWrapper onClick={handleClickMoreBtn}>
        <MoreBtnIcon
          sx={buttonColor === 'grey' ? { color: '#aaa' } : { color: '#fff' }}
        />
      </ButtonWrapper>
      {MoreMenu}
      {TwoOptionsModalInMenu}
      <ReportModal
        type={type}
        storyOptions={options}
        isModalOpen={isReportModalOpen}
        onCloseModal={handleCloseReportModal}
        onRefetch={onRefetch}
      />
    </>
  );
};

const ButtonWrapper = styled(IconButton)(() => ({
  width: '35px',
  height: '35px',
  padding: 0,
  '& svg': {
    fontSize: '1.3rem'
  }
}));

const MenuItemWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column'
}));

const MenuItem = styled('button')(() => ({
  backgroundColor: 'transparent',
  fontSize: '16px',
  padding: '10px 20px',
  color: 'black',
  textAlign: 'left',
  fontFamily: 'SeoulNamsanM, sans-serif !important',
  border: 'none'
}));

const MoreBtnIcon = styled(MoreVertIcon)(() => ({
  color: '#434343',
  fontSize: '2rem'
}));

const MenuWrapper = styled(Menu)(() => ({
  '& li': {
    padding: '10px 20px'
  }
}));

const BlockTextInModal = styled(Box)(() => ({
  padding: '1rem 0',
  '& p': { fontSize: '0.75rem' }
}));

export default MoreButton;
