import { atom } from 'jotai';

export const isLoggedInAtom = atom<boolean>(false);

type LoginRoutingType = {
  routingPage: string;
  storyListActiveTab: 0 | 1;
  status: 'login' | 'accountLink' | 'none';
};

export const loginRoutingAtom = atom<LoginRoutingType>({
  routingPage: '',
  storyListActiveTab: 0 || 1,
  status: 'none'
});
