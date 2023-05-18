import { nanoid } from 'nanoid';

export const reformatStoryPoints = (contents: string | StoryPoint[]) => {
  let storyPoints = null;

  if (typeof contents === 'string') {
    storyPoints = JSON.parse(contents).storyPoints;
  } else {
    storyPoints = contents;
  }

  storyPoints?.forEach((storyPoint: StoryPoint) => {
    storyPoint.blocks = storyPoint.blocks.map((block: Block) => ({
      ...block,
      _blockId: nanoid(),
      get blockId() {
        return this._blockId;
      },
      set blockId(value) {
        this._blockId = value;
      }
    }));

    if (
      typeof storyPoint.Latitude === 'string' ||
      typeof storyPoint.Longitude === 'string'
    ) {
      storyPoint.Latitude = Number(storyPoint.Latitude);
      storyPoint.Longitude = Number(storyPoint.Longitude);
    }
  });

  return storyPoints;
};

export const reformatPlayStoryData = (contents: string | StoryPoint[]) => {
  let storyPoints = null;

  if (typeof contents === 'string') {
    storyPoints = JSON.parse(contents);
  } else {
    storyPoints = contents;
  }

  return storyPoints;
};
