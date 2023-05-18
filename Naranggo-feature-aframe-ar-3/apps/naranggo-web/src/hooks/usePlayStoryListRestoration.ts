import { SyntheticEvent, useLayoutEffect, useRef, useState } from 'react';
import { playStoryIconShowAtom } from '@/atoms/filterIconShowAtom';
import isBottomModalOpenAtom from '@/atoms/isBottomModalOpenAtom';
import { visitedPageInformationAtom } from '@/atoms/visitedPageInformationAtom';
import { SortItem } from '@pages/story';
import produce from 'immer';
import { useAtom, useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { FixedSizeList, ListOnScrollProps } from 'react-window';
import usePrevious from './usePrevious';

const initialPlayStorySort: SortItem[] = [
  { text: '최신순', checked: true, orderType: 1 },
  { text: '인기순', checked: false, orderType: 2 },
  { text: '가까운순', checked: false, orderType: 3 }
];

const initialPlayStoryListInformation = {
  y: {
    total: 0,
    koreaIndependence: 0,
    baekje: 0
  },
  activeTab: 0,
  storySort: initialPlayStorySort
} as const;

const usePlayStoryListRestoration = () => {
  const router = useRouter();
  const totalListRef = useRef<FixedSizeList>(null);
  const baekjeListRef = useRef<FixedSizeList>(null);
  const koreaIndependenceListRef = useRef<FixedSizeList>(null);

  const [visitedPageInformation, setVisitedPageInformation] = useAtom(
    visitedPageInformationAtom
  );

  const setFilterApply = useSetAtom(playStoryIconShowAtom);
  const setIsBottomModalOpen = useSetAtom(isBottomModalOpenAtom);

  const restoredInformation =
    visitedPageInformation['PLAY_STORY'][router.asPath];

  const previousActiveTab = usePrevious(restoredInformation?.activeTab);

  const [apliedFilter, setAppliedFilter] = useState({
    storySort: restoredInformation
      ? restoredInformation.storySort
      : initialPlayStorySort
  });

  const cancleApplingFilter = () => {
    setAppliedFilter({
      storySort: restoredInformation.storySort
    });
  };

  const handleClickSortBtn = (selectedOrderType: 1 | 2 | 3) => {
    const newTotalStorySort = apliedFilter.storySort.map(
      (sortKind: SortItem) => {
        const { orderType } = sortKind;

        return {
          ...sortKind,
          checked: orderType === selectedOrderType ? true : false
        };
      }
    );

    setAppliedFilter({ ...apliedFilter, storySort: newTotalStorySort });
  };

  const handleClickSortStory = () => {
    const nextState = produce(visitedPageInformation, (draft) => {
      draft.PLAY_STORY[router.asPath] = {
        ...draft.PLAY_STORY[router.asPath],
        ...apliedFilter
      };
    });

    setVisitedPageInformation(nextState);
    isAppliedFilter();
    setIsBottomModalOpen(false);
  };

  const isAppliedFilter = () => {
    if (apliedFilter.storySort[0].checked) {
      setFilterApply(false);
    } else {
      setFilterApply(true);
    }
  };

  const handleResetFilter = () => {
    setAppliedFilter({
      ...apliedFilter,
      storySort: initialPlayStorySort
    });
  };

  const handleChangeTab = (_: SyntheticEvent, activeTab: 0 | 1 | 2) => {
    const nextState = produce(visitedPageInformation, (draft) => {
      if (!draft.PLAY_STORY[router.asPath]) {
        return;
      }

      draft.PLAY_STORY[router.asPath].activeTab = activeTab;
    });

    setVisitedPageInformation(nextState);
  };

  const handleScroll = (
    { scrollOffset }: ListOnScrollProps,
    appliedTab: 'total' | 'baekje' | 'koreaIndependence'
  ) => {
    const nextState = produce(visitedPageInformation, (draft) => {
      if (!draft.PLAY_STORY[router.asPath]) {
        return;
      }

      draft.PLAY_STORY[router.asPath].y[appliedTab] = scrollOffset;
    });

    setVisitedPageInformation(nextState);
  };

  useLayoutEffect(() => {
    if (
      restoredInformation &&
      restoredInformation.activeTab !== previousActiveTab
    ) {
      restoredInformation.activeTab === 0
        ? totalListRef.current?.scrollTo(restoredInformation.y.total)
        : baekjeListRef.current?.scrollTo(restoredInformation.y.baekje);
    }
  }, [previousActiveTab, restoredInformation]);

  useLayoutEffect(() => {
    if (!restoredInformation) {
      const nextState = produce(visitedPageInformation, (draft) => {
        draft.PLAY_STORY[router.asPath] = initialPlayStoryListInformation;
      });

      setVisitedPageInformation(nextState);
    }
  }, [
    restoredInformation,
    router.asPath,
    visitedPageInformation,
    setVisitedPageInformation
  ]);

  return {
    activeTab: restoredInformation?.activeTab ?? 0,
    storySort: restoredInformation?.storySort ?? initialPlayStorySort,
    totalListRef,
    baekjeListRef,
    koreaIndependenceListRef,
    apliedFilter,
    cancleApplingFilter,
    handleChangeTab,
    handleScroll,
    handleClickSortBtn,
    handleClickSortStory,
    handleResetFilter
  };
};

export default usePlayStoryListRestoration;
