export const PROFILE = 'https://resources-cf.naranggo.com/profiles/';
export const AVATAR_IMAGE_URL = 'https://resources-cf.naranggo.com/avatars/';
export const DEFAULT_PROILFE_IMAGE =
  './public/images/user-profile-svgrepo-com.gif';
export const STORY_CONTENT_IMAGE =
  'https://resources-cf.naranggo.com/thumbnails50/';
export const STORY_REPRESENTATIVE_IMAGE =
  'https://resources-cf.naranggo.com/uploads/';
export const isKTOpost = (path: string) =>
  path.includes('tong.visitkorea.or.kr');
export const PlAY_STORY_AUDIO = 'https://resources-cf.naranggo.com/nrg_audio/';

const PATHS = Object.freeze({
  PROFILE,
  AVATAR_IMAGE_URL,
  DEFAULT_PROILFE_IMAGE,
  STORY_CONTENT_IMAGE,
  STORY_REPRESENTATIVE_IMAGE,
  PlAY_STORY_AUDIO
});

export default PATHS;
