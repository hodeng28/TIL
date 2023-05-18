import axios from '@/api/axiosClient';
import { AxiosError } from 'axios';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

export const commentKey = {
  all: ['getReplyList'] as const,
  id: (idblog: string | string[] | undefined) =>
    [...commentKey.all, idblog] as const
};

type CommentRequestParam = {
  idblog: string | string[] | undefined;
  timeStamp: number;
} & AccessInfo;

const getComment = async (params: CommentRequestParam) =>
  (
    await axios.get('/apis/getReplyList', {
      params
    })
  ).data;

export const useGetComment = (
  { idblog, accessId, accesstoken, timeStamp }: CommentRequestParam,
  options?: Omit<
    UseQueryOptions<
      ApiResponse<CommentResponse>,
      AxiosError<unknown, unknown>,
      CommentResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery<ApiResponse<CommentResponse>, AxiosError, CommentResponse>(
    commentKey.id(idblog),
    () => getComment({ idblog, accessId, accesstoken, timeStamp }),
    options
  );
