import { atomWithStorage } from 'jotai/utils';

interface GoogleAuthResponse {
  user: {
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
    familyName: string | null;
    givenName: string | null;
  };
  scopes?: string[];
  idToken: string | null;
  serverAuthCode: string | null;
}

export type LoginType = typeof LoginTypeEnum[keyof typeof LoginTypeEnum];

interface SocialLogin {
  socialId: string; // socialId 는 소셜로그인 이후 provider(google, facebook 등등..)에서 제공해주는 unique한 id 값
  status: 'none' | 'loading' | 'complete';
  division: LoginType; // 무엇으로 인증되었는지 여부 판단.
}

export const LoginTypeEnum = {
  Google: 2,
  Apple: 4,
  Facebook: 1,
  Guest: 0
  //   case 'facebook':
  //     return 1;
  //   case 'google':
  //     return 2;
  //   case 'apple':
  //     return 4;
  //   default:
  //     return 0; // guest
} as const;

const socialLoginAtom = atomWithStorage<SocialLogin>('social', {
  socialId: '',
  status: 'none',
  division: LoginTypeEnum.Guest
});

export default socialLoginAtom;
