import createdStoryIdblogAtom from '@/atoms/createdStoryIdblogAtom';
import {
  isBeforePopStateEventTriggered,
  isCurrentPageVisitedByBackspaceAtom,
  updateIsBeforePopStateEventTriggered
} from '@/atoms/isCurrentPageVisitedByBackspaceAtom';
import isRoutingAtom from '@/atoms/isRouting';
import { makeJotaiSessionStorage } from '@/utils/helpers';
import { useAtom, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';

export const createdStoryIdblog = atomWithStorage(
  'createdStoryIdblog',
  0,
  makeJotaiSessionStorage()
);

const useBackspace = () => {
  const router = useRouter();

  const setIsCurrentPageVisitedByBackspace = useSetAtom(
    isCurrentPageVisitedByBackspaceAtom
  );

  const [createdStoryIdblog, setCreatedStoryIdblog] = useAtom(
    createdStoryIdblogAtom
  );

  const setIsRouting = useSetAtom(isRoutingAtom);

  useEffect(() => {
    updateIsBeforePopStateEventTriggered(false);

    const handleChangeRouteStart = () => {
      setIsRouting(true);

      isBeforePopStateEventTriggered
        ? setIsCurrentPageVisitedByBackspace(true)
        : setIsCurrentPageVisitedByBackspace(false);
    };

    const handleChangeRouteComplete = () => {
      setIsRouting(false);

      if (isCurrentPageNewlyWrittenStory(router, createdStoryIdblog)) {
        setCreatedStoryIdblog(0);
      }
    };

    router.beforePopState(() => {
      updateIsBeforePopStateEventTriggered(true);
      return true;
    });

    router.events.on('routeChangeStart', handleChangeRouteStart);
    router.events.on('routeChangeComplete', handleChangeRouteComplete);

    return () => {
      router.events.off('routeChangeStart', handleChangeRouteStart);
      router.events.off('routeChangeComplete', handleChangeRouteComplete);
    };
  }, [
    createdStoryIdblog,
    router,
    setCreatedStoryIdblog,
    setIsCurrentPageVisitedByBackspace,
    setIsRouting
  ]);

  useEffect(() => {
    if (isCurrentPageStoryWrite(router)) {
      return;
    }

    if (isNewlyWrittenStoryExist(createdStoryIdblog)) {
      router.push(`/story/${createdStoryIdblog}`);
    }
  }, [createdStoryIdblog, router, setCreatedStoryIdblog]);
};

export default useBackspace;

const isCurrentPageNewlyWrittenStory = (
  router: NextRouter,
  createdStoryIdblog: number
) => router.asPath.includes(`${createdStoryIdblog}`);

const isCurrentPageStoryWrite = (router: NextRouter) =>
  router.asPath.includes('/story/write');

export const isNewlyWrittenStoryExist = (createdStoryIdblog: number) =>
  createdStoryIdblog !== 0;
