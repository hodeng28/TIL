import { atom } from 'jotai';

const isGPSEnabledAtom = atom<boolean | undefined>(undefined);

export default isGPSEnabledAtom;
