// 설계가 잘못되어서 피할수없이 만들어진 atom

import { atom } from 'jotai';
import { RefObject } from 'react';

const mainContainerRefAtom = atom<null | RefObject<HTMLDivElement>>(null);

export default mainContainerRefAtom;
