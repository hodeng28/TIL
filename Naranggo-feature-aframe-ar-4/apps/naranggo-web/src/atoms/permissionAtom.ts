import { atom } from 'jotai';

export type AppPermission = {
  'CAMERA': RequestPermissionStatus;
  'ALBUM': RequestPermissionStatus;
  'LOCATION': RequestPermissionStatus;
};

const permissionAtom = atom<AppPermission>({
  'CAMERA': 'denied',
  'ALBUM': 'denied',
  'LOCATION': 'denied'
});

export default permissionAtom;
