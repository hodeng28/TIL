import { useEffect, useRef, useState } from 'react';

const useStoryRecommendationVisibilityDecisionAtom = () => {
  const observerRef = useRef<HTMLDivElement>(null);
  const [isObserverVisible, setIsObserverVisible] = useState(false);
  const [isAllImagesLoaded, setIsAllImagesLoaded] = useState(false);

  useEffect(() => {
    const observerElement = observerRef.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(() => {
        setIsObserverVisible(true);
      });
    });

    observerElement && observer.observe(observerElement);

    return () => {
      observerElement && observer.unobserve(observerElement);
    };
  }, [isAllImagesLoaded]);

  return {
    observerRef,
    isObserverVisible,
    isAllImagesLoaded,
    setIsAllImagesLoaded
  };
};

export default useStoryRecommendationVisibilityDecisionAtom;
