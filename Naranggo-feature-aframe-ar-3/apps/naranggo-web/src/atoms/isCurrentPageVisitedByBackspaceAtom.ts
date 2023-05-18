import { makeJotaiSessionStorage } from '@/utils/helpers';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { SyncStorage } from 'jotai/vanilla/utils/atomWithStorage';

export let isBeforePopStateEventTriggered = false;

export const updateIsBeforePopStateEventTriggered = (
  newIsBeforePopStateEventTriggered: boolean
) => (isBeforePopStateEventTriggered = newIsBeforePopStateEventTriggered);

export const storyReadScrollPositionsAtom = atomWithStorage<{
  [id: string]: {
    y: number;
    height: number;
  };
}>(
  'storyReadScrollPositions',
  {},
  makeJotaiSessionStorage() as SyncStorage<{
    [id: string]: {
      y: number;
      height: number;
    };
  }>
);

export const isCurrentPageVisitedByBackspaceAtom = atom(false);
