import { atom } from 'jotai';

const keepMapLocationAtom = atom<MapCoordinate | undefined>(undefined);

export default keepMapLocationAtom;
