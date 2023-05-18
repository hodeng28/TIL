import { makeJotaiSessionStorage } from '@/utils/helpers';
import { SortItem } from '@pages/story';
import { atomWithStorage } from 'jotai/utils';
import { SyncStorage } from 'jotai/vanilla/utils/atomWithStorage';

type StoryRead = {
  y: number;
  height: number;
};

type Footer = string;

type StoryGroup = {
  y: number;
};

type InformationStructure<T> = {
  [id: string]: T;
};

export type PlayStoryList = {
  y: {
    total: number;
    koreaIndependence: number;
    baekje: number;
  };
  activeTab: 0 | 1 | 2;
  storySort: SortItem[];
};

export type StoryList = {
  y: {
    follow: number;
    total: number;
  };
  activeTab: 0 | 1;
  storySort: SortItem[];
  storyFilter: StoryDateFilter[];
};

type VisitedPageInformationAtom = {
  'STORY_LIST': InformationStructure<StoryList>;
  'STORY_READ': InformationStructure<StoryRead>;
  'FOOTER': InformationStructure<Footer>;
  'STORY_GROUP': InformationStructure<StoryGroup>;
  'PLAY_STORY': InformationStructure<PlayStoryList>;
};

export const visitedPageInformationAtom =
  atomWithStorage<VisitedPageInformationAtom>(
    'storyReadScrollPositions',
    {
      'STORY_LIST': {},
      'STORY_READ': {},
      'FOOTER': {},
      'STORY_GROUP': {},
      'PLAY_STORY': {}
    },
    makeJotaiSessionStorage() as SyncStorage<VisitedPageInformationAtom>
  );
