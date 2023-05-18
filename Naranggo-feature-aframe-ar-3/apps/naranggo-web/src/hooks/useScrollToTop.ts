import { RefObject, useState } from 'react';
import { debounce } from '@mui/material';
import { scrollTo } from '@/utils/helpers';

interface useScrollToTopProps {
  ref: RefObject<HTMLDivElement>;
  scrollY?: number;
}

const useScrollToTop = ({
  ref: scrollElementRef,
  scrollY: scrollYForBtnDisplay = 100
}: useScrollToTopProps) => {
  const [isScrollToTopBtnDisplayed, setisScrollToTopBtnDisplayed] =
    useState(false);

  const changeScrollToTopBtnDisplay = debounce(
    ({
      target
    }: React.UIEvent<HTMLDivElement> & { target: HTMLDivElement }) => {
      const { scrollTop } = target;

      if (scrollTop > scrollYForBtnDisplay) {
        return setisScrollToTopBtnDisplayed(true);
      }

      return setisScrollToTopBtnDisplayed(false);
    },
    100
  );

  const scrollToTop = () => scrollTo(scrollElementRef);

  return {
    isScrollToTopBtnDisplayed,
    changeScrollToTopBtnDisplay,
    scrollToTop
  };
};

export default useScrollToTop;
