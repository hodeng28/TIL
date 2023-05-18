import axios from '@/api/axiosClient';
import { AxiosError } from 'axios';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

const profileKeys = {
  all: ['getProfile'] as const,
  id: (iduser: number) => [...profileKeys.all, iduser] as const
};

type UserInfoRequestParam = {
  iduser: number;
  timeStamp: number;
} & AccessInfo;

interface Profile {
  message: string;
  returnValue: number;
  data: {
    iduser: number;
    nickname: string;
    userinfo: string;
    profilepath: string;
    storycount: number;
    isfollow: 0 | 1;
    followercount: number;
    followingcount: number;
    accountinfo: number[];
    isblock: 0 | 1;
    isblocked: 0 | 1;
  };
}

const getUserInfo = async (params: UserInfoRequestParam) =>
  (
    await axios.get('/apis/getUserInfo', {
      params
    })
  ).data;

export const useGetProfile = (
  { iduser, accessId, accesstoken, timeStamp }: UserInfoRequestParam,
  options?: Omit<
    UseQueryOptions<
      ApiResponse<Profile>,
      AxiosError<unknown, unknown>,
      Profile,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery<ApiResponse<Profile>, AxiosError, Profile>(
    profileKeys.id(iduser),
    () => {
      return getUserInfo({ iduser, accessId, accesstoken, timeStamp });
    },
    options
  );
