import { atomWithMountInitialization } from '@/utils/helpers';

export const mapCenterAtom = atomWithMountInitialization<{
  lat: number;
  lng: number;
}>({
  lat: 0,
  lng: 0
});

export const markerToStoryPointInformationAtom =
  atomWithMountInitialization<MarkerToStoryPointInformation>({});

export const scrolledByButtonAtom = atomWithMountInitialization(false);

export const elementInformationAtom = atomWithMountInitialization({
  firstStoryPointHeaderPaddingTop: 0,
  storyContentClientHeight: 0
});

type SelectedCommentToReplyAtom = null | {
  nickname: string;
  idreply: string;
};

export const selectedCommentToReplyAtom =
  atomWithMountInitialization<SelectedCommentToReplyAtom>(null);

export const mainImageOpacityAtom = atomWithMountInitialization(1);
