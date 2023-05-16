import { storyFilterIconShowAtom } from '@/atoms/filterIconShowAtom';
import isBottomModalOpenAtom from '@/atoms/isBottomModalOpenAtom';
import { isCurrentPageVisitedByBackspaceAtom } from '@/atoms/isCurrentPageVisitedByBackspaceAtom';
import { visitedPageInformationAtom } from '@/atoms/visitedPageInformationAtom';
import { SortItem } from '@pages/story';
import produce from 'immer';
import { useAtom, useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { SyntheticEvent, useLayoutEffect, useRef, useState } from 'react';
import { FixedSizeList, ListOnScrollProps } from 'react-window';
import usePrevious from './usePrevious';

const initialStorySort: SortItem[] = [
  { text: '최신순', checked: true, orderType: 1 },
  { text: '인기순', checked: false, orderType: 2 },
  { text: '가까운순', checked: false, orderType: 3 }
];

const initialStoryFilter: StoryDateFilter[] = [
  { text: '전체', id: 0, checked: true, date: 0 },
  { text: '1개월', id: 1, checked: false, date: 1 },
  { text: '6개월', id: 2, checked: false, date: 6 },
  { text: '1년', id: 3, checked: false, date: 12 }
];

const initialStoryListInformation = {
  y: {
    follow: 0,
    total: 0
  },
  activeTab: 0,
  storySort: initialStorySort,
  storyFilter: initialStoryFilter
} as const;

const useStoryListRestoration = () => {
  const router = useRouter();
  const totalListRef = useRef<FixedSizeList>(null);
  const followingListRef = useRef<FixedSizeList>(null);

  const [visitedPageInformation, setVisitedPageInformation] = useAtom(
    visitedPageInformationAtom
  );

  const setFilterApply = useSetAtom(storyFilterIconShowAtom);
  const setIsBottomModalOpen = useSetAtom(isBottomModalOpenAtom);

  const restoredInformation =
    visitedPageInformation['STORY_LIST'][router.asPath];

  const previousActiveTab = usePrevious(restoredInformation?.activeTab);

  const [apliedFilter, setAppliedFilter] = useState({
    storySort: restoredInformation
      ? restoredInformation.storySort
      : initialStorySort,
    storyFilter: restoredInformation
      ? restoredInformation.storyFilter
      : initialStoryFilter
  });

  const cancleApplingFilter = () => {
    setAppliedFilter({
      storySort: restoredInformation.storySort,
      storyFilter: restoredInformation.storyFilter
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
      draft.STORY_LIST[router.asPath] = {
        ...draft.STORY_LIST[router.asPath],
        ...apliedFilter
      };
    });

    setVisitedPageInformation(nextState);
    isAppliedFilter();
    setIsBottomModalOpen(false);
  };

  const isAppliedFilter = () => {
    if (
      apliedFilter.storySort[0].checked &&
      apliedFilter.storyFilter[0].checked
    ) {
      setFilterApply(false);
    } else {
      setFilterApply(true);
    }
  };

  const handleClickFilterPeriod = (clickedId: number) => {
    const selectedPeriod = apliedFilter.storyFilter.map(
      (period: StoryDateFilter) => {
        const { id } = period;

        if (id === clickedId) {
          return { ...period, checked: true };
        }
        return { ...period, checked: false };
      }
    );

    setAppliedFilter({ ...apliedFilter, storyFilter: selectedPeriod });
  };

  const handleResetFilter = () => {
    setAppliedFilter({
      ...apliedFilter,
      storyFilter: initialStoryFilter,
      storySort: initialStorySort
    });
  };

  const handleChangeTab = (_: SyntheticEvent, activeTab: 0 | 1) => {
    const nextState = produce(visitedPageInformation, (draft) => {
      if (!draft.STORY_LIST[router.asPath]) {
        return;
      }

      draft.STORY_LIST[router.asPath].activeTab = activeTab;
    });

    setVisitedPageInformation(nextState);
  };

  const handleScroll = (
    { scrollOffset }: ListOnScrollProps,
    appliedTab: 'total' | 'follow'
  ) => {
    const nextState = produce(visitedPageInformation, (draft) => {
      if (!draft.STORY_LIST[router.asPath]) {
        return;
      }

      draft.STORY_LIST[router.asPath].y[appliedTab] = scrollOffset;
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
        : followingListRef.current?.scrollTo(restoredInformation.y.follow);
    }
  }, [previousActiveTab, restoredInformation]);

  useLayoutEffect(() => {
    if (!restoredInformation) {
      const nextState = produce(visitedPageInformation, (draft) => {
        draft.STORY_LIST[router.asPath] = initialStoryListInformation;
      });

      setVisitedPageInformation(nextState);
    }
  }, [
    restoredInformation,
    router.asPath,
    visitedPageInformation,
    setVisitedPageInformation
  ]);

  const handleChangeFromAllowToDisallow = () => {
    const nextAppliedFilter = {
      ...apliedFilter,
      storyFilter: [...initialStoryFilter]
    };

    setAppliedFilter(nextAppliedFilter);

    const nextVisitedPageInformation = produce(visitedPageInformation, (draft) => {
      draft.STORY_LIST[router.asPath] = {
        ...draft.STORY_LIST[router.asPath],
        ...apliedFilter
      }});

    setVisitedPageInformation(nextVisitedPageInformation);

    isAppliedFilter();
  }

  return {
    activeTab: restoredInformation?.activeTab ?? 0,
    storySort: restoredInformation?.storySort ?? initialStorySort,
    periodFilter: restoredInformation?.storyFilter ?? initialStoryFilter,
    totalListRef,
    followingListRef,
    apliedFilter,
    cancleApplingFilter,
    handleChangeTab,
    handleScroll,
    handleClickSortBtn,
    handleClickSortStory,
    handleClickFilterPeriod,
    handleResetFilter,
    handleChangeFromAllowToDisallow
  };
};

export default useStoryListRestoration;
