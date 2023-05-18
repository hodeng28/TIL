import { atomWithStorage } from 'jotai/utils';

const notificationIconShowAtom = atomWithStorage(
  'isNotificationMessage',
  false
);

export default notificationIconShowAtom;
