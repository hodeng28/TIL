import { atom } from 'jotai';

interface VersionInfoType {
  currentVersion: string;
  currentBuildNumber: number;
  latestVersion: string;
  isNeeded: boolean;
  storeUrl: string;
}

const versionAtom = atom<VersionInfoType>({
  currentVersion: '',
  currentBuildNumber: 0,
  latestVersion: '',
  isNeeded: false,
  storeUrl: ''
});

export default versionAtom;
