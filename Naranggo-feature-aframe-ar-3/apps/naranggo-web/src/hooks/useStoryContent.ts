import {
  elementInformationAtom,
  markerToStoryPointInformationAtom
} from '@/atoms/storyReadAtom';
import { isNil } from '@/utils/helpers';
import { useSetAtom } from 'jotai';
import { RefObject, useCallback, useEffect } from 'react';

interface UseStoryContent {
  storyContentRef: RefObject<HTMLDivElement>;
  storyPointsWithBlockKey: StoryPointWithBlockKey[];
}

const useStoryContent = ({
  storyPointsWithBlockKey,
  storyContentRef
}: UseStoryContent) => {
  const setMarkerToStoryPointInformation = useSetAtom(
    markerToStoryPointInformationAtom
  );

  const setElementInformation = useSetAtom(elementInformationAtom);

  const calcurateElementInformation = useCallback(() => {
    const storyContentChildren =
      storyContentRef.current?.querySelectorAll('.story-point');
    let markerToStoryPointInformation = {};

    setElementInformation((prevState) => ({
      ...prevState,
      storyContentClientHeight: storyContentRef.current?.clientHeight || 0
    }));

    if (!isNil(storyContentChildren)) {
      Array.from(storyContentChildren).forEach((storyPointElement, index) => {
        const { Latitude, Longitude } = storyPointsWithBlockKey[index];
        if (index === 0) {
          const firstStoryPointHeaderElement = storyPointElement.children[0];
          const { paddingTop } = getComputedStyle(firstStoryPointHeaderElement);
          const paddingTopValue = +paddingTop.slice(0, paddingTop.length - 2);

          markerToStoryPointInformation = {
            [`${Latitude}-${Longitude}`]: {
              scrollYPosition: paddingTopValue,
              storyPointNodeHeight:
                storyPointElement.getBoundingClientRect().height,
              lat: Latitude,
              lng: Longitude
            }
          };

          setElementInformation((prevState) => ({
            ...prevState,
            firstStoryPointHeaderPaddingTop:
              paddingTopValue === 0 ? 20 : paddingTopValue
          }));
        } else {
          markerToStoryPointInformation = {
            ...markerToStoryPointInformation,
            [`${Latitude}-${Longitude}`]: {
              scrollYPosition: (storyPointElement as HTMLDivElement).offsetTop,
              storyPointNodeHeight:
                storyPointElement.getBoundingClientRect().height,
              lat: Latitude,
              lng: Longitude
            }
          };
        }
      });
    }

    setMarkerToStoryPointInformation(markerToStoryPointInformation);
  }, [
    storyContentRef,
    storyPointsWithBlockKey,
    setElementInformation,
    setMarkerToStoryPointInformation
  ]);

  useEffect(() => {
    calcurateElementInformation();
  }, [calcurateElementInformation]);

  return calcurateElementInformation;
};

export default useStoryContent;
