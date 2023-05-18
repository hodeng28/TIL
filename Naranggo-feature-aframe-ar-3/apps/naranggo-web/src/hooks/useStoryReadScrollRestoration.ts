import {
  isBeforePopStateEventTriggered,
  isCurrentPageVisitedByBackspaceAtom
} from '@/atoms/isCurrentPageVisitedByBackspaceAtom';
import { isPreviewPageAtom } from '@/atoms/storyWriteAtom';
import { visitedPageInformationAtom } from '@/atoms/visitedPageInformationAtom';
import { scrollTo } from '@/utils/helpers';
import produce from 'immer';
import { useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import usePrevious from './usePrevious';

const useStoryReadScrollRestoration = (idblog: number | undefined) => {
  const router = useRouter();
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const storyContentRef = useRef<HTMLDivElement>(null);

  const isPreviewPage = useAtomValue(isPreviewPageAtom);

  const [visitedPageInformation, setVisitedPageInformation] = useAtom(
    visitedPageInformationAtom
  );

  const isCurrentPageVisitedByBackspace = useAtomValue(
    isCurrentPageVisitedByBackspaceAtom
  );

  const restoredInformation =
    router.asPath in visitedPageInformation['STORY_READ']
      ? visitedPageInformation['STORY_READ'][router.asPath]
      : null;

  const previousPage = usePrevious(idblog);

  useEffect(() => {
    if (isPreviewPage || !isCurrentPageVisitedByBackspace) {
      return;
    }

    if (restoredInformation) {
      const { y, height } = restoredInformation;
      // console.log('💕 현재 URL', window.location.href);
      // console.log('😊 복원하려는 스크롤 높이', height);
      // console.log('🙇‍♂️ 현재 스크롤 높이', storyContentRef.current.clientHeight);

      if (storyContentRef.current?.clientHeight === height) {
        // console.log('🎉 복원 성공');
        scrollTo(scrollElementRef, +y);
      }
    }
  }, [
    idblog,
    isCurrentPageVisitedByBackspace,
    isPreviewPage,
    previousPage,
    restoredInformation,
    router,
    scrollElementRef
  ]);

  useEffect(() => {
    if (isPreviewPage) {
      return;
    }

    const handleChangeRouteStart = () => {
      const nextState = produce(visitedPageInformation, (draft) => {
        draft.STORY_READ[router.asPath] = {
          y: scrollElementRef.current?.scrollTop ?? 0,
          height: storyContentRef.current?.clientHeight ?? 0
        };
      });
      // console.log('💕 저장되는 URL', onlyPath);
      // console.log('🙏 event', event);
      // console.log('🙇‍♂️ asPath', router.asPath);

      setVisitedPageInformation(nextState);
    };

    router.events.on('routeChangeStart', handleChangeRouteStart);

    return () => {
      router.events.off('routeChangeStart', handleChangeRouteStart);
    };
  }, [
    idblog,
    isPreviewPage,
    scrollElementRef,
    router.asPath,
    router.events,
    visitedPageInformation,
    setVisitedPageInformation
  ]);

  useEffect(() => {
    if (idblog !== previousPage && !isBeforePopStateEventTriggered) {
      scrollTo(scrollElementRef, 0);
    }
  }, [idblog, previousPage]);

  return { scrollElementRef, storyContentRef };
};

export default useStoryReadScrollRestoration;
