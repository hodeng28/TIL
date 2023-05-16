import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { styled, IconButton, Container } from '@mui/material';
import useScrollToTop from '@/hooks/useScrollToTop';
import { BaseList } from '@naranggo/storybook';
import { scrollTo, shouldNotForwardProp } from '@/utils/helpers';
import { useRouter } from 'next/router';
import produce from 'immer';
import { useAtom, useAtomValue } from 'jotai';
import { visitedPageInformationAtom } from '@/atoms/visitedPageInformationAtom';
import { isCurrentPageVisitedByBackspaceAtom } from '@/atoms/isCurrentPageVisitedByBackspaceAtom';

interface StoryListProps {
  isFooter?: boolean;
  overFlowYScrollFalse?: true;
}

const StoryList = ({
  isFooter,
  overFlowYScrollFalse,
  children
}: PropsWithChildren<StoryListProps>) => {
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const {
    isScrollToTopBtnDisplayed,
    changeScrollToTopBtnDisplay,
    scrollToTop
  } = useScrollToTop({
    ref: listRef
  });

  const handleScroll = (
    e: React.UIEvent<HTMLDivElement> & { target: HTMLDivElement }
  ) => {
    const nextState = produce(visitedPageInformation, (draft) => {
      draft.STORY_GROUP[router.asPath] = {
        y: e.target.scrollTop
      };
    });

    setVisitedPageInformation(nextState);
    changeScrollToTopBtnDisplay(e);
  };

  const isCurrentPageVisitedByBackspace = useAtomValue(
    isCurrentPageVisitedByBackspaceAtom
  );

  const [visitedPageInformation, setVisitedPageInformation] = useAtom(
    visitedPageInformationAtom
  );

  const restoredInformation = Reflect.has(
    visitedPageInformation.STORY_GROUP,
    router.asPath
  )
    ? visitedPageInformation.STORY_GROUP[router.asPath]
    : {
        y: 0
      };

  useEffect(() => {
    if (!Reflect.has(visitedPageInformation.STORY_GROUP, router.asPath)) {
      const nextState = produce(visitedPageInformation, (draft) => {
        draft.STORY_GROUP[router.asPath] = {
          y: 0
        };
      });

      setVisitedPageInformation(nextState);
    }
  }, [router.asPath, setVisitedPageInformation, visitedPageInformation]);

  useEffect(() => {
    if (!isCurrentPageVisitedByBackspace) {
      const nextState = produce(visitedPageInformation, (draft) => {
        draft.STORY_GROUP[router.asPath] = {
          y: 0
        };
      });

      setVisitedPageInformation(nextState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      ['/mypage/scrap', '/mypage/favorite'].some((targetUrl) => {
        if (router.asPath.includes(targetUrl)) {
          return true;
        }
      }) &&
      isCurrentPageVisitedByBackspace
    ) {
      scrollTo(listRef, restoredInformation.y);
    }
  }, [isCurrentPageVisitedByBackspace, restoredInformation.y, router.asPath]);

  return (
    <Wrapper
      overFlowYScrollFalse={overFlowYScrollFalse}
      onScroll={handleScroll}
      ref={listRef}
    >
      <BaseList direction="vertical">{children}</BaseList>
      {isScrollToTopBtnDisplayed && (
        <ScrollTopBtn onClick={scrollToTop} isFooter={isFooter}>
          <ArrowUpwardIcon />
        </ScrollTopBtn>
      )}
    </Wrapper>
  );
};

export default StoryList;

const Wrapper = styled(
  Container,
  shouldNotForwardProp('overFlowYScrollFalse')
)<{ overFlowYScrollFalse?: boolean }>(({ overFlowYScrollFalse }) => ({
  flex: 1,
  overflowY: overFlowYScrollFalse ? 'unset' : 'scroll',
  padding: 0
}));

const ScrollTopBtn = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'isFooter'
})<{ isFooter?: boolean }>(({ isFooter, theme }) => ({
  position: 'absolute',
  bottom: isFooter ? '5rem' : '1rem',
  right: '1.5rem',
  zIndex: 999,
  backgroundColor: theme.palette.custom.light,
  '&:hover': {
    backgroundColor: theme.palette.custom.light
  },
  boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.2)'
}));
