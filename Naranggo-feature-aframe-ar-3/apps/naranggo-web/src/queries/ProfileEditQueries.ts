import axios from '@/api/axiosClient';
import { AxiosError } from 'axios';
import { QueryKey, useMutation, useQuery, UseQueryOptions } from 'react-query';

const profileKeys = {
  all: ['getProfile'] as const,
  id: (iduser: number) => [...profileKeys.all, iduser] as const
};

type UserInfoRequestParam = {
  iduser: number;
  timeStamp: number;
} & AccessInfo;

interface Profile {
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
}

const getUserInfo = async (params: UserInfoRequestParam) =>
  (
    await axios.get('/apis/getUserInfo', {
      params
    })
  ).data.data;

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

type UploadProfileImageParam = {
  img: File;
} & AccessInfo;

type UploadProfileImageResponse = {
  filename: string;
};

const uploadProfileImage = async ({
  img,
  accessId,
  accesstoken
}: UploadProfileImageParam) =>
  (
    await axios.post(
      `/apis/uploadProfile`,
      {
        img,
        accessId,
        accesstoken
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  ).data.data;

export const useUploadProfileImage = () =>
  useMutation<UploadProfileImageResponse, AxiosError, UploadProfileImageParam>(
    uploadProfileImage
  );

type ProfileSetParam = {
  nickname: string;
  userinfo: string;
  profilepath: string;
} & AccessInfo;

type ProfileSetResponse = {
  returnValue: string;
};

const setProfile = async (params: ProfileSetParam) =>
  (await axios.post('/apis/setUserInfo', { ...params })).data;

export const useSetProfile = () =>
  useMutation<ApiResponse<ProfileSetResponse>, AxiosError, ProfileSetParam>(
    setProfile
  );
