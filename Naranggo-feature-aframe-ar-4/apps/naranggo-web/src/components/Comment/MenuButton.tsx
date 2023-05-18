import { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, styled } from '@mui/material';
import { useAtomValue } from 'jotai';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReportModal from '@/components/Modal/ReportModal';
import useReport from '@/components/Modal/useReport';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import { BaseModal } from '@naranggo/storybook';
import {
  useDelReply,
  useDelRereply,
  DelReplyRequestParam,
  DelRereplyRequestParam
} from './queries';
import { useBlock, useUnBlock } from '@/api/UserBlockQueries';
import { useQueryClient } from 'react-query';

interface MoreButtonProps {
  activeCommentUserId: number;
  editCommentText: string;
  isblock: number;
  idreply: string;
  idrereply: string;
  queryKey: string | string[];
  onClickEdit: () => void;
  setActiveComment: React.Dispatch<ActiveComment | null>;
  onRefetch: () => void;
}

const MenuButton = ({
  idreply,
  isblock,
  idrereply,
  queryKey,
  editCommentText,
  activeCommentUserId,
  setActiveComment,
  onRefetch,
  onClickEdit
}: MoreButtonProps) => {
  const {
    accesstoken,
    iduser: loggedInUserId,
    nickname
  } = useAtomValue(loginProfileAtom);
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDelCommentMutate = async (
    variables: DelReplyRequestParam | DelRereplyRequestParam
  ) => {
    await queryClient.cancelQueries(queryKey);

    const snapShotOfPreviousAllData =
      queryClient.getQueryData<CommentResponse>(queryKey);

    const snapShotOfPreviousTitleData =
      queryClient.getQueryData<CommentResponse>(queryKey)?.data.title;

    const snapShotOfPreviousWriterIduserData =
      queryClient.getQueryData<CommentResponse>(queryKey)?.data.writeriduser;

    const snapShotOfPreviousReplyData =
      queryClient.getQueryData<CommentResponse>(queryKey)?.data.reply;

    if (
      snapShotOfPreviousAllData &&
      snapShotOfPreviousTitleData &&
      snapShotOfPreviousReplyData &&
      snapShotOfPreviousWriterIduserData
    ) {
      if ('idreply' in variables) {
        queryClient.setQueryData<CommentResponse>(queryKey, {
          message: snapShotOfPreviousAllData.message,
          returnValue: snapShotOfPreviousAllData.returnValue,
          data: {
            title: snapShotOfPreviousTitleData,
            writeriduser: snapShotOfPreviousWriterIduserData,
            reply: snapShotOfPreviousReplyData.filter(
              (comment) => comment.idreply !== idreply
            )
          }
        });
      } else {
        queryClient.setQueryData<CommentResponse>(queryKey, {
          message: snapShotOfPreviousAllData.message,
          returnValue: snapShotOfPreviousAllData.returnValue,
          data: {
            title: snapShotOfPreviousTitleData,
            writeriduser: snapShotOfPreviousWriterIduserData,
            reply: snapShotOfPreviousReplyData.filter(
              (comment) => comment.idrereply !== idrereply
            )
          }
        });
      }
    }
  };

  const { mutate: delReply } = useDelReply({ onDelCommentMutate });
  const { mutate: delRereply } = useDelRereply({ onDelCommentMutate });
  const { mutate: block } = useBlock();
  const { mutate: unBlock } = useUnBlock();

  const { isReportModalOpen, handleOpenReportModal, handleCloseReportModal } =
    useReport();

  const handleOpenModal = () => {
    setAnchorEl(null);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleClickMoreBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClickEditBtnInMenu = () => {
    handleCloseMenu();
    onClickEdit && onClickEdit();

    if (idrereply === '0') {
      return setActiveComment({
        nickname,
        idreply,
        idrereply,
        type: 'ReplyEditing',
        priorText: editCommentText
      });
    }

    return setActiveComment({
      nickname,
      idreply,
      idrereply,
      type: 'RereplyEditing',
      priorText: editCommentText
    });
  };

  const handleClickRemoveBtnInMenu = () => {
    handleCloseMenu();
    handleCloseModal();

    if (idrereply === '0') {
      return delReply({
        idreply: idreply,
        accesstoken,
        accessId: loggedInUserId
      });
    }

    return delRereply({
      idrereply: idrereply,
      accesstoken,
      accessId: loggedInUserId
    });
  };

  const handleClickReportBtnInMenu = () => {
    handleCloseMenu();
    handleOpenReportModal();
  };

  const handleClickBlockBtnInMenu = () => {
    handleCloseMenu();
    handleCloseModal();

    if (isblock === 1) {
      return unBlock(
        {
          iduser: activeCommentUserId,
          accesstoken,
          accessId: loggedInUserId
        },
        {
          onSuccess: onRefetch
        }
      );
    }

    return block(
      {
        iduser: activeCommentUserId,
        accesstoken,
        accessId: loggedInUserId
      },
      {
        onSuccess: onRefetch
      }
    );
  };

  const MoreMenu = [
    isblock === 1 && (
      <Menu
        key="writer"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
        }}
      >
        <MenuItem onClick={handleClickBlockBtnInMenu}>차단 해제</MenuItem>
      </Menu>
    ),
    activeCommentUserId === loggedInUserId && (
      <Menu
        key="writer"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
        }}
      >
        <MenuItem onClick={handleClickEditBtnInMenu}>수정</MenuItem>
        <MenuItem onClick={handleOpenModal}>삭제</MenuItem>
      </Menu>
    ),
    isblock === 0 && activeCommentUserId !== loggedInUserId && (
      <Menu
        key="notWriter"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
        }}
      >
        <MenuItem onClick={handleClickReportBtnInMenu}>신고</MenuItem>
        <MenuItem onClick={handleOpenModal}>차단</MenuItem>
      </Menu>
    )
  ];

  return (
    <>
      <ButtonWrapper onClick={handleClickMoreBtn}>
        <MoreBtnIcon />
      </ButtonWrapper>
      {MoreMenu}
      {activeCommentUserId === loggedInUserId ? (
        <BaseModal
          isModalOpen={isModalOpen}
          leftBtnName="취소"
          rightBtnName="삭제"
          onClickLeftBtn={handleCloseModal}
          onClickRightBtn={handleClickRemoveBtnInMenu}
          onCloseModal={handleCloseModal}
        >
          댓글을 삭제하시겠습니까?
        </BaseModal>
      ) : (
        <BaseModal
          isModalOpen={isModalOpen}
          leftBtnName="취소"
          rightBtnName="차단"
          onClickLeftBtn={handleCloseModal}
          onClickRightBtn={handleClickBlockBtnInMenu}
          onCloseModal={handleCloseModal}
        >
          이 사용자의 모든 스토리와 댓글이 보이지 않게 됩니다.
          <BlockTextInModal>이 사용자를 차단하시겠습니까?</BlockTextInModal>
        </BaseModal>
      )}
      <ReportModal
        type="Reply"
        commentOptions={{
          iduser: activeCommentUserId,
          idreply: idreply,
          idrereply: idrereply
        }}
        onRefetch={onRefetch}
        isModalOpen={isReportModalOpen}
        onCloseModal={handleCloseReportModal}
      />
    </>
  );
};

export default MenuButton;

const ButtonWrapper = styled(IconButton)(() => ({
  width: '35px',
  height: '35px',
  padding: '0.3rem',
  borderRadius: 5,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  '& svg': {
    fontSize: '1.3rem'
  }
}));

const MoreBtnIcon = styled(MoreVertIcon)(() => ({
  color: '#aaa',
  fontSize: '2rem'
}));

const BlockTextInModal = styled(Box)(() => ({
  padding: '1rem 0',
  '& p': { fontSize: '0.75rem' }
}));
