import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BaseList from './Base';
import BaseCard from '../Card/Base';

export default {
  title: 'Components/List',
  component: BaseList,
  argTypes: {
    direction: {
      control: { 'type': 'select', 'options': ['vertical', 'horizontal'] }
    }
  }
} as ComponentMeta<typeof BaseList>;

const storyItem = {
  pointcount: 1,
  islike: 0,
  title: '솔밭 삼겹살',
  distance: 25.200096268886217,
  nickname: '부러우면짖는개',
  createdtime: '2019년 12월 24일',
  likecount: 0,
  replycountsum: 1,
  contents: '',
  idblog: 0,
  summary: ''
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const handleClickCard = () => {};

const handleClickPlaceBtn = (
  e: React.MouseEvent<HTMLButtonElement>,
  contents: string
  // eslint-disable-next-line @typescript-eslint/no-empty-function
) => {};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const handleClickHeartBtn = () => {};

const card = (topBtn: number) => {
  return (
    <BaseCard
      storyItem={storyItem}
      representativeImageUrl="
        https://resources-cf.naranggo.com/thumbnails50/64c25a5c-0068-432c-b707-d5731d43362c-1552980377465_92"
      profileImageUrl=""
      createdtime={storyItem.createdtime}
      onClickPlaceBtn={(e: React.MouseEvent<HTMLButtonElement>) =>
        handleClickPlaceBtn(e, storyItem.contents)
      }
      onClickHeartBtn={handleClickHeartBtn}
      onClickCard={handleClickCard}
      variant={topBtn === 1 ? 'topBtn' : 'none'}
    />
  );
};

export const Base: ComponentStory<typeof BaseList> = ({ direction }) => {
  if (direction === 'vertical') {
    return (
      <>
        <h2 style={{ marginBottom: 0 }}>direction - vertical</h2>
        <div style={{ height: '500px', overflowY: 'scroll' }}>
          <BaseList direction="vertical">
            {card(1)}
            {card(1)}
            {card(1)}
            {card(1)}
            {card(1)}
          </BaseList>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 style={{ marginBottom: 0 }}>direction - horizontal</h2>
      <BaseList direction="horizontal">
        {card(0)}
        {card(0)}
        {card(0)}
        {card(0)}
        {card(0)}
      </BaseList>
    </>
  );
};
