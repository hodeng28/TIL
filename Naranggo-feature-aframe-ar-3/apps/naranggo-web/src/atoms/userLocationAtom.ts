import { atom } from 'jotai';

const userLocationAtom = atom<MapCoordinate | undefined>(undefined);

export default userLocationAtom;
