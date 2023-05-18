/* eslint-disable @typescript-eslint/no-empty-function */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import OfficialCard from './Official';

export default {
  title: 'Components/Card',
  component: OfficialCard,
  args: {
    image:
      'https://resources-cf.naranggo.com/thumbnails50/64c25a5c-0068-432c-b707-d5731d43362c-1552980377465_92',
    title: '백제의 비밀이 잠들어있는 방이동 고분군 여행.',
    isLike: 1,
    onClickCard: () => {},
    onClickHeartBtn: () => {}
  }
} as ComponentMeta<typeof OfficialCard>;

export const Official: ComponentStory<typeof OfficialCard> = ({
  image,
  title,
  isLike
}) => {
  const handleClickCard = () => {};
  const handleClickHeartBtn = () => {};

  return (
    <OfficialCard
      image={image}
      title={title}
      isLike={isLike}
      onClickCard={handleClickCard}
      onClickHeartBtn={handleClickHeartBtn}
    />
  );
};
