import { PropsWithChildren, RefObject, useEffect } from 'react';
import { styled, Container } from '@mui/material';
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
  listRef: RefObject<HTMLDivElement>;
}

const StoryList = ({
  overFlowYScrollFalse,
  listRef,
  children
}: PropsWithChildren<StoryListProps>) => {
  const router = useRouter();

  const handleScroll = (
    e: React.UIEvent<HTMLDivElement> & { target: HTMLDivElement }
  ) => {
    const nextState = produce(visitedPageInformation, (draft) => {
      draft.STORY_GROUP[router.asPath] = {
        y: e.target.scrollTop
      };
    });

    setVisitedPageInformation(nextState);
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
      isCurrentPageVisitedByBackspace &&
      listRef.current
    ) {
      scrollTo(listRef, restoredInformation.y);
    }
  }, [
    isCurrentPageVisitedByBackspace,
    listRef,
    restoredInformation.y,
    router.asPath
  ]);

  return (
    <Wrapper
      overFlowYScrollFalse={overFlowYScrollFalse}
      onScroll={handleScroll}
      ref={listRef}
    >
      <BaseList direction="vertical">{children}</BaseList>
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
