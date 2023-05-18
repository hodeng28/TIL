import { atom } from 'jotai';

export type MenuAcholElAtomType = HTMLElement | null;

const menuAnchorElAtom = atom<HTMLElement | null>(null);

export default menuAnchorElAtom;
