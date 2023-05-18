import axios from '@/api/axiosClient';
import { AxiosError } from 'axios';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

const keys = {
  all: ['getStoryRead'] as const,
  id: (idblog: number) => [...keys.all, idblog] as const
};

type StoryRequestParams = {
  idblog: number;
  timeStamp: number;
} & AccessInfo;

const getStory = async ({
  idblog,
  accessId,
  accesstoken,
  timeStamp
}: StoryRequestParams) =>
  (
    await axios.get<ApiResponse<StoryItem | { returnValue: -101 }>>(
      `/apis/getStory?idblog=${idblog}&accessId=${accessId}&accesstoken=${accesstoken}&timeStamp=${timeStamp}`
    )
  ).data;

export const useStoryQuery = (
  { idblog, accessId, accesstoken, timeStamp }: StoryRequestParams,
  options?: Omit<
    UseQueryOptions<
      ApiResponse<StoryItem | { returnValue: -101 }>,
      AxiosError<unknown, unknown>,
      ApiResponse<StoryItem | { returnValue: -101 }>,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery<ApiResponse<StoryItem | { returnValue: -101 }>, AxiosError>(
    keys.id(idblog),
    () =>
      getStory({
        idblog,
        accessId,
        accesstoken,
        timeStamp
      }),
    options
  );
