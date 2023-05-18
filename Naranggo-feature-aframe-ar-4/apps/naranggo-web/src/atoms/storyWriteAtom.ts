import { atomWithMountInitialization } from '@/utils/helpers';
import { atom } from 'jotai';

export const isPreviewPageAtom = atomWithMountInitialization(false);

export const isPreviewOpenAtom = atomWithMountInitialization(false);

interface StoryPreviewInformationAtom {
  title: string;
  summary: string;
  representative: string;
}

export const storyPreviewInformationAtom = atom<StoryPreviewInformationAtom>({
  title: '',
  summary: '',
  representative: ''
});
