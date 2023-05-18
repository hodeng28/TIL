import { RefObject, useCallback } from 'react';

const useScrollToLeft = (ref: RefObject<HTMLDivElement>) => {
  const scrollToLeft = useCallback(() => {
    ref?.current?.scrollTo({
      left: 0
    });
  }, [ref]);

  return { scrollToLeft };
};

export default useScrollToLeft;
