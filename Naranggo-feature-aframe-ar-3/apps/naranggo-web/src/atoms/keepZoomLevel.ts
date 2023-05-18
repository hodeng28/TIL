import { atom } from 'jotai';
import { DEFAULT_ZOOM } from '@/consts/constants';

const keepZoomLevelAtom = atom(DEFAULT_ZOOM);

export default keepZoomLevelAtom;
