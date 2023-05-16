import { Dispatch, useEffect, useState } from 'react';

export type SortingDirectionType =
  typeof SortingDirectionEnum[keyof typeof SortingDirectionEnum];

export type SortedType = {
  key: 'distance' | 'createdtime' | 'likecount';
  direction: 'asc' | 'desc';
};

const SortingDirectionEnum = {
  ASC: 'asc',
  DESC: 'desc'
} as const;

const BUTTON_TYPE = ['가까운순', '최신순', '좋아요순'];

const SORT_TYPE: SortedType[] = [
  { key: 'distance', direction: 'asc' },
  { key: 'createdtime', direction: 'desc' },
  { key: 'likecount', direction: 'desc' }
];

const useStoryListDisplay = ({
  storyList,
  currentStoryList,
  setCurrentStoryList
}: {
  storyList: StoryItem[];
  currentStoryList: StoryItem[];
  setCurrentStoryList: Dispatch<StoryItem[]>;
}) => {
  const sorting = (key: SortedType['key'], direction: SortingDirectionType) => {
    const sorted = [...storyList];

    sorted?.sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setCurrentStoryList(sorted);
  };

  useEffect(() => {
    if (storyList.length === currentStoryList.length) {
      return;
    }

    setCurrentStoryList([...storyList]);
  }, [currentStoryList, setCurrentStoryList, storyList]);

  const [btnText, setBtnText] = useState(BUTTON_TYPE[0]);

  const changeStoryList = (btnType: string) => {
    switch (btnType) {
      case BUTTON_TYPE[0]:
        sorting(SORT_TYPE[0].key, SORT_TYPE[0].direction);
        break;
      case BUTTON_TYPE[1]:
        sorting(SORT_TYPE[1].key, SORT_TYPE[1].direction);
        break;
      case BUTTON_TYPE[2]:
        sorting(SORT_TYPE[2].key, SORT_TYPE[2].direction);
        break;
      default:
    }
  };

  const changeSortBtnText = (btnType: string) => {
    switch (btnType) {
      case BUTTON_TYPE[0]:
        sorting(SORT_TYPE[1].key, SORT_TYPE[1].direction);
        setBtnText(BUTTON_TYPE[1]);
        break;
      case BUTTON_TYPE[1]:
        sorting(SORT_TYPE[2].key, SORT_TYPE[2].direction);
        setBtnText(BUTTON_TYPE[2]);
        break;
      case BUTTON_TYPE[2]:
        sorting(SORT_TYPE[0].key, SORT_TYPE[0].direction);
        setBtnText(BUTTON_TYPE[0]);
        break;
      default:
    }
  };

  return { btnText, changeSortBtnText, changeStoryList };
};

export default useStoryListDisplay;
