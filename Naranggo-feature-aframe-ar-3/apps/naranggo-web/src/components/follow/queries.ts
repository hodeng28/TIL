import axios from '@/api/axiosClient';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

export type FollowListRequestParam = {
  iduser: string | number | string[] | undefined;
  followType: number;
  lastIdfollow: number;
  timeStamp: number;
} & AccessInfo;

export const getFollowList = async (params: FollowListRequestParam) =>
  (
    await axios.get('/apis/getFollowList', {
      params
    })
  ).data.data.map((data: FollowItem) => {
    const { idfollow, iduser, nickname, profilepath, isfollow, userinfo } =
      data;

    return {
      idfollow,
      iduser,
      nickname,
      profilepath,
      userinfo,
      isFollowEachOther: isfollow,
      isFollowUser: 1
    };
  });

export type GetBlockUserListRequestParam = {
  lastIdBlock: number;
  timeStamp: number;
} & AccessInfo;

export const getBlockUserList = async (params: GetBlockUserListRequestParam) =>
  (
    await axios.get('/apis/getBlockUserList', {
      params
    })
  ).data.data;

export type GetAlertListRequestParam = {
  lastidalert: number;
  timeStamp: number;
} & AccessInfo;

export const getAlertList = async (params: GetAlertListRequestParam) =>
  (
    await axios.get('/apis/getAlertList', {
      params
    })
  ).data.data;

type DelAlertRequestParam = {
  idalert: number;
} & AccessInfo;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DelAlertResponse {}

const delAlert = async (params: DelAlertRequestParam) =>
  (await axios.delete('/apis/delAlert', { params })).data;

export const useDelAlert = () =>
  useMutation<ApiResponse<DelAlertResponse>, AxiosError, DelAlertRequestParam>(
    delAlert
  );

type DelAllAlertRequestParam = AccessInfo;

const delAllAlert = async (params: DelAllAlertRequestParam) =>
  (await axios.delete('/apis/delAllAlert', { params })).data;

export const useAllDelAlert = () =>
  useMutation<
    ApiResponse<DelAlertResponse>,
    AxiosError,
    DelAllAlertRequestParam
  >(delAllAlert);
