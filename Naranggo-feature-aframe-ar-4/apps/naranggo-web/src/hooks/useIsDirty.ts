import { deepEqual } from '@/utils/helpers';
import { useEffect, useRef, useState } from 'react';

const useIsDirty = <T>(
  watchingState: T,
  { isWatchingStateInitializedImmediately = true }
) => {
  const originStateRef = useRef<T>();
  const isInitializedRef = useRef<boolean>(false);
  const [isPossibleToInitialize, setIsPossibleToInitialize] = useState(
    isWatchingStateInitializedImmediately
  );

  useEffect(() => {
    if (!isPossibleToInitialize || isInitializedRef.current) {
      return;
    }

    if (isPossibleToInitialize) {
      originStateRef.current = watchingState;
    }

    isInitializedRef.current = true;
  }, [
    isWatchingStateInitializedImmediately,
    isPossibleToInitialize,
    watchingState
  ]);

  return {
    isStateInitialized: isInitializedRef.current,
    isDirty: isInitializedRef.current
      ? !deepEqual(originStateRef.current, watchingState)
      : undefined,
    setIsPossibleToInitialize
  };
};

export default useIsDirty;
