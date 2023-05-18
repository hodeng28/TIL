import { atom } from 'jotai';

interface SnackBarAtom {
  isSnackBarOpen: boolean;
  message: string;
  vertical: 'bottom' | 'top';
}

const snackBarAtom = atom<SnackBarAtom>({
  isSnackBarOpen: false,
  message: '',
  vertical: 'bottom'
});

export default snackBarAtom;
