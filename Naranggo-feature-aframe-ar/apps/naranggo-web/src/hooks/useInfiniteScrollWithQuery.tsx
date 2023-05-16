import { useEffect } from 'react';
import { UseInfiniteQueryResult } from 'react-query';
import { useInView } from 'react-intersection-observer';

const useInfiniteScrollWithQuery = <T,>({
  data,
  fetchNextPage,
  error,
  refetch,
  isLoading,
  isFetching
}: UseInfiniteQueryResult<T[], unknown>) => {
  const ObservationComponent = () => {
    const [ref, inView] = useInView({ threshold: 0 });

    useEffect(() => {
      if (!data) return;
      const lastPageLength = data?.pages[data?.pages.length - 1].length;

      const isLast = lastPageLength === 0;
      if (!isLast && inView) {
        fetchNextPage({ cancelRefetch: false }); // react infnite query
      }
    }, [inView]);

    return <div ref={ref} />;
  };

  return {
    data: data?.pages.map((page) => page).flat(),
    error,
    refetch,
    isLoading,
    isFetching,
    ObservationComponent
  };
};

export default useInfiniteScrollWithQuery;

export const useInfiniteScrollWithQueryInPlayStory = <T,>({
  data,
  fetchNextPage,
  error,
  refetch,
  isLoading,
  isFetching
}: UseInfiniteQueryResult<T[], unknown>) => {
  const ObservationComponent = () => {
    const [ref, inView] = useInView({ threshold: 0 });

    useEffect(() => {
      if (!data) return;

      const lastPageLength = (
        Object.values(
          data.pages[data.pages.length - 1]
        ).pop() as PlayStoryItemData[]
      ).length;
      const isLast = lastPageLength === 0;

      if (!isLast && inView) {
        fetchNextPage({ cancelRefetch: false }); // react infnite query
      }
    }, [inView]);

    return <div ref={ref} />;
  };

  return {
    data: data?.pages.map((page) => page).flat(),
    error,
    refetch,
    isLoading,
    isFetching,
    ObservationComponent
  };
};
