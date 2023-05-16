import { atomWithHash } from 'jotai-location';

export const termsOfServiceModalAtom = atomWithHash('terms', false);

export const reportModalAtom = atomWithHash('report', false);

export const storySaveModalAtom = atomWithHash('storySaveModal', false);
export const storyPreviewModalAtom = atomWithHash('storyPreviewModal', false);

export const storySearchModalAtom = atomWithHash('storySearchModal', false);
export const isPointEditModalOpenAtom = atomWithHash(
  'isPointEditModalOpen',
  false
);

export const systemAccessModalAtom = atomWithHash('AccessModal', false);
