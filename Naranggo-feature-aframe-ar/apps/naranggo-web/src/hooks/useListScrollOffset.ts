import { RefObject, useLayoutEffect } from 'react';
import { TotalScrollAtom, FollowingScrollAtom } from '@/atoms/ListScrollTop';
import { useAtom } from 'jotai';
import { FixedSizeList } from 'react-window';

const useListScrollOffset = (
  ref?: RefObject<FixedSizeList>,
  page?: string | number
) => {
  const [TotalScrollOffsetAtom, setTotalScrollOffsetAtom] =
    useAtom(TotalScrollAtom);

  const [FollowingScrollOffsetAtom, setFollowingScrollOffsetAtom] =
    useAtom(FollowingScrollAtom);

  useLayoutEffect(() => {
    switch (page) {
      case 'total':
        ref?.current?.scrollTo(TotalScrollOffsetAtom);
        break;

      case 'following':
        ref?.current?.scrollTo(FollowingScrollOffsetAtom);
        break;

      default:
        break;
    }
  }, [FollowingScrollOffsetAtom, TotalScrollOffsetAtom, page, ref]);

  return {
    setTotalScrollOffsetAtom,
    setFollowingScrollOffsetAtom
  };
};

export default useListScrollOffset;
