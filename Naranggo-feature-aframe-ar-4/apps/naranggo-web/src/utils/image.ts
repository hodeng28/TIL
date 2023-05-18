const PROFILE_IMAGE_URL = 'https://resources-cf.naranggo.com/profiles/';

// 원본 이미지를 중간 사이즈로 리사이징한 이미지
const THUMBNAILS50_IMAGE_URL =
  'https://resources-cf.naranggo.com/thumbnails50/';

// 원본 이미지를 작은 사이즈로 리사이징한 이미지
const THUMBNAILS_IMAGE_URL = 'https://resources-cf.naranggo.com/thumbnails/';

export const SEARCH_POINT_PIN_IMAGE_URL = '/images/search_marker.svg';

export const getMarkerImage = (representative: string) => {
  if (!representative) {
    return representative;
  }
  // if (representative === '') {
  //   return representative;
  // }

  // 한국 관광공사인 경우
  if (representative.startsWith('/')) {
    return '/images/korea_tour.jpg';
  }

  return THUMBNAILS_IMAGE_URL + representative;
};

export const getStoryImage = (type: string, path: string) => {
  if (path && path.includes('tong.visitkorea.or.kr')) {
    return path.startsWith('http') ? path : 'https:' + path;
  }

  if (path === null) {
    return '/images/no-image22.png';
  }

  if (type === 'thumbnails50' && path === 'representative') {
    return '/images/no-image22.png';
  }

  if (type === 'thumbnails50' && path !== '' && path !== 'representative') {
    return THUMBNAILS50_IMAGE_URL + path;
  }

  return '/images/empty_photo_1.svg';
};

export const getProfileImage = (type: string, path: string) => {
  if (path === null || path === '') {
    return '/images/profile_empty.png';
  }

  if (type === 'profile' && path !== '' && path !== undefined) {
    return PROFILE_IMAGE_URL + path;
  }

  return '/images/profile_empty.png';
};

export const getPointImage = (representative: string) => {
  return THUMBNAILS_IMAGE_URL + representative;
};
