import axios from '@/api/axiosClient';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

export type RegistrationRelyRequestParam = {
  idblog: number;
  idreply: string;
  nickname: string;
  reply_contents: string;
} & AccessInfo;

interface RegistrationRelyResponse {
  idreply: number;
}

const RegistrationRely = async (params: RegistrationRelyRequestParam) =>
  (await axios.post('/apis/setReply', { ...params })).data;

export const useRegistrationRely = ({
  onMutate
}: {
  onMutate: ((variables: RegistrationRelyRequestParam) => unknown) | undefined;
}) =>
  useMutation<
    ApiResponse<RegistrationRelyResponse>,
    AxiosError,
    RegistrationRelyRequestParam
  >(RegistrationRely, { onMutate: onMutate });

export type RegistrationRereplyRequestParam = {
  idblog: number;
  idreply: string;
  idrereply: string;
  nickname: string;
  reply_contents: string;
} & AccessInfo;

interface RegistrationRereplyResponse {
  idrereply: string;
}

const RegistrationRereply = async (params: RegistrationRereplyRequestParam) =>
  (await axios.post('/apis/setRereply', { ...params })).data;

export const useRegistrationRereply = ({
  onMutate
}: {
  onMutate:
    | ((variables: RegistrationRereplyRequestParam) => unknown)
    | undefined;
}) =>
  useMutation<
    ApiResponse<RegistrationRereplyResponse>,
    AxiosError,
    RegistrationRereplyRequestParam
  >(RegistrationRereply, { onMutate: onMutate });

export type DelReplyRequestParam = {
  idreply: string;
} & AccessInfo;

interface DelReplyResponse {
  delReplyCount: number;
}

const delReply = async (params: DelReplyRequestParam) =>
  (await axios.delete('/apis/delReply', { params })).data;

export const useDelReply = ({
  onDelCommentMutate
}: {
  onDelCommentMutate:
    | ((variables: DelReplyRequestParam) => unknown)
    | undefined;
}) =>
  useMutation<ApiResponse<DelReplyResponse>, AxiosError, DelReplyRequestParam>(
    delReply,
    {
      onMutate: onDelCommentMutate
    }
  );

export type DelRereplyRequestParam = {
  idrereply: string;
} & AccessInfo;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DelRereplyResponse {}

const delRereply = async (params: DelRereplyRequestParam) =>
  (await axios.delete('/apis/delRereply', { params })).data;

export const useDelRereply = ({
  onDelCommentMutate
}: {
  onDelCommentMutate:
    | ((variables: DelRereplyRequestParam) => unknown)
    | undefined;
}) =>
  useMutation<
    ApiResponse<DelRereplyResponse>,
    AxiosError,
    DelRereplyRequestParam
  >(delRereply, {
    onMutate: onDelCommentMutate
  });
