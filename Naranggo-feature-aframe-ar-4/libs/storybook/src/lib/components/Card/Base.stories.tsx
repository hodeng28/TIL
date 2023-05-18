/* eslint-disable @typescript-eslint/no-empty-function */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BaseCard from './Base';

export default {
  title: 'Components/Card',
  component: BaseCard,
  args: {
    storyItem: {
      pointcount: 1,
      islike: 0,
      title: '솔밭 삼겹살',
      distance: 25.200096268886217,
      nickname: '부러우면짖는개',
      likecount: 0,
      replycountsum: 1,
      contents: ''
    },
    createdtime: '2019년 12월 24일',
    representativeImageUrl:
      'https://resources-cf.naranggo.com/thumbnails50/64c25a5c-0068-432c-b707-d5731d43362c-1552980377465_92',
    profileImageUrl: '',
    onClickPlaceBtn: () => {},
    onClickHeartBtn: () => {},
    onClickCard: () => {},
    size: 'small',
    variant: 'topBtn'
  },
  argTypes: {
    variant: {
      'control': { 'type': 'radio', 'options': ['topBtn', 'none'] }
    }
  }
} as unknown as ComponentMeta<typeof BaseCard>;

export const Base: ComponentStory<typeof BaseCard> = (args) => {
  const {
    storyItem,
    createdtime,
    representativeImageUrl,
    profileImageUrl,
    variant
  } = args;
  const handleClickCard = () => {};

  const handleClickPlaceBtn = (
    e: React.MouseEvent<HTMLButtonElement>,
    contents: string
  ) => {
    e.stopPropagation();
  };

  const handleClickHeartBtn = () => {};

  return (
    <>
      <h2 style={{ marginBottom: 0 }}>
        {variant === 'topBtn' ? 'variant - topBtn' : 'none'}
      </h2>

      <BaseCard
        storyItem={storyItem}
        profileImageUrl={profileImageUrl}
        representativeImageUrl={representativeImageUrl}
        createdtime={createdtime}
        onClickPlaceBtn={(e) => handleClickPlaceBtn(e, storyItem.contents)}
        onClickHeartBtn={handleClickHeartBtn}
        onClickCard={handleClickCard}
        variant={variant}
      />
      <h2 style={{ marginBottom: 0 }}>size - small</h2>
      <BaseCard
        storyItem={storyItem}
        representativeImageUrl={representativeImageUrl}
        profileImageUrl={profileImageUrl}
        createdtime={createdtime}
        onClickPlaceBtn={(e) => handleClickPlaceBtn(e, storyItem.contents)}
        onClickHeartBtn={handleClickHeartBtn}
        onClickCard={handleClickCard}
        variant={variant}
        size="small"
      />
    </>
  );
};
