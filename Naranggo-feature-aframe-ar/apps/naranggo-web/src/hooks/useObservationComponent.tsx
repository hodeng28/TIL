import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface UseObservationComponent {
  lastInViewCallback: () => void;
}

const useObservationComponent = ({
  lastInViewCallback
}: UseObservationComponent) => {
  const [ref, inView] = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView) {
      lastInViewCallback();
    }
  }, [inView, lastInViewCallback]);

  return {
    ref
  };
};

export default useObservationComponent;
