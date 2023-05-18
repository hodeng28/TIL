import { AxiosError } from 'axios';
import {
  QueryKey,
  useInfiniteQuery,
  useMutation,
  useQuery,
  UseQueryOptions
} from 'react-query';
import axios from '@/api/axiosClient';

const storyWriteKeys = {
  all: ['addresses'] as const,
  address: (mapCoordinate: MapCoordinate) =>
    [...storyWriteKeys.all, mapCoordinate] as const
};

const storyKeys = {
  all: (storyId: number) => ['story', storyId] as const
};

type UseGoogleMapAddress = {
  coordinate: MapCoordinate;
  options: UseQueryOptions<GoogleGeocodeResult, AxiosError>;
};

const getAddressWithCoordinate = async ({ lat, lng }: MapCoordinate) => {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`
  );

  return await res.json();
};

export const useGoogleMapAddress = ({
  coordinate,
  options = {}
}: UseGoogleMapAddress) =>
  useQuery<GoogleGeocodeResult, AxiosError>(
    storyWriteKeys.address(coordinate),
    () => getAddressWithCoordinate(coordinate),
    options
  );

export interface StoryWriteParam {
  idblog: number;
  lat: number;
  lng: number;
  playable: number;
  publicsetting: number;
  estimatedtime: number;
  agecheck: number;
  isplan: number;
  isaudio: number;
  pointcount: number;
  title: string;
  contents: string;
  summary: string;
  representative: string;
}

type StoryWriteRequestParam = StoryWriteParam & AccessInfo;

interface StoryWriteResponse {
  idblog: string;
}

const writeStory = async (params: StoryWriteRequestParam) =>
  (await axios.post('/apis/setStory', { ...params })).data;

export const useWritingStory = () =>
  useMutation<
    ApiResponse<StoryWriteResponse>,
    AxiosError,
    StoryWriteRequestParam
  >(writeStory);

export type StoryListRequestParam = {
  pageNo: number;
  orderType: number;
  period: number;
  lat: number;
  lng: number;
  filterType: number;
  timeStamp: number;
} & AccessInfo;

export const getStoryList = async (params: StoryListRequestParam) =>
  (
    await axios.get<ApiResponse<StoryItem[]>>('/apis/getStoryList', {
      params
    })
  ).data.data;

export type PlayStoryListRequestParam = {
  pageNo: number;
  orderType: number;
  idOfficialCategory: number;
  lat: number;
  lng: number;
} & AccessInfo;

export const getPlayStoryList = async (params: PlayStoryListRequestParam) =>
  (
    await axios.get<ApiResponse<PlayStoryData[]>>('/apis/getPlayStoryList', {
      params
    })
  ).data.data;

export type StoryFollowListRequestParam = {
  iduser: number;
  followType: number;
  lastIdfollow: number;
  timeStamp: number;
} & AccessInfo;

export const getFollowStoryList = async (params: StoryFollowListRequestParam) =>
  (
    await axios.get<ApiResponse<FollowItem[]>>('/apis/getFollowList', {
      params
    })
  ).data.data;

export type StoryUserListRequestParam = {
  iduser: number;
  lastIdBlog: number;
  orderType: number;
  lat: number;
  lng: number;
  timeStamp: number;
} & AccessInfo;

export const getUserStoryList = async (params: StoryUserListRequestParam) =>
  (
    await axios.get<ApiResponse<StoryItem[]>>('/apis/getUserStoryList', {
      params
    })
  ).data.data;

export type StoryLikeListRequestParam = {
  lastIdLike: number;
  lat: number;
  lng: number;
  timeStamp: number;
} & AccessInfo;

export const getLikeStoryList = async (params: StoryLikeListRequestParam) =>
  (
    await axios.get<ApiResponse<StoryItem[]>>('/apis/getLikeStoryList', {
      params
    })
  ).data.data;

export type ScrapStoryListRequestParam = {
  lastIdScrap: number;
  lat: number;
  lng: number;
  timeStamp: number;
} & AccessInfo;

export const getScrapStoryList = async (params: ScrapStoryListRequestParam) =>
  (
    await axios.get<ApiResponse<StoryItem[]>>('/apis/getScrapStoryList', {
      params
    })
  ).data.data;

export type SearchStoryListRequestParam = {
  searchWord: string;
  matchScore: number;
  lastIdBlog: number;
  lat: number;
  lng: number;
  timeStamp: number;
} & AccessInfo;

export const getSearchStoryList = async (params: SearchStoryListRequestParam) =>
  (
    await axios.get<ApiResponse<SearchData[]>>('/apis/searchStory', {
      params
    })
  ).data.data;

export type SearchUserListRequestParam = {
  nickname: string;
  lastIdUser: number;
  timeStamp: number;
} & AccessInfo;

export const getSearchUserList = async (params: SearchUserListRequestParam) =>
  (
    await axios.get<ApiResponse<SearchData[]>>('/apis/searchUser', {
      params
    })
  ).data.data;

export type NearStoryListRequestParam = {
  filterType: number[];
  leftTopLat: number;
  leftTopLng: number;
  rightBottomLat: number;
  rightBottomLng: number;
  period: number;
  lat: number;
  lng: number;
  timeStamp: number;
} & AccessInfo;

export const getNearStoryList = async (params: NearStoryListRequestParam) =>
  (
    await axios.get('/apis/getNearStoryList', {
      params
    })
  ).data.data;

export type PagingType = 'PageNumber' | 'IdProperty';
type PageNumber = 'pageNo';
type PageParamKeyType<T> = keyof T | PageNumber;

// T: response type, P: request parameter type
// 서버 구조가 워낙 독특해서 아래와 같은 복잡한 구조는 저도 어쩔수 없습니다. by 최대욱
interface useInfiniteListProps<T, P> {
  queryKey: string | string[];
  pagingType: PagingType;
  queryFn: (params: P) => Promise<T[]>;
  apiParam: P & AccessInfo;
  matchScorePagingRequestParamKey?: string;
  matchScorePagingParamKey?: string;
  matchScorePagingParamStartValue?: number;
  pagingParamKey?: PageParamKeyType<T>; // paging 시 key값이 될 대상. 유일하게 getStoryList만 page number를 별도로 가지고 있다.
  pagingRequestParamKey?: string; // paging 시 key값이 될 대상을 보낼 requet Type... 유일하게 getStoryList만 page number를 별도로 가지고 있다.
  pagingParamStartValue?: number; // 첫 로드시 api 문서에서 원하는 id 값. 기본은 -1
  enabled?: boolean;
  refetchOnReconnect?: boolean;
  refetchOnWindowFocus?: boolean;
  refetchInterval?: false | undefined;
}

export const useInfiniteList = <T, P>({
  queryKey,
  queryFn,
  apiParam,
  pagingParamKey = 'pageNo',
  pagingRequestParamKey = 'pageNo',
  matchScorePagingParamKey,
  matchScorePagingRequestParamKey,
  matchScorePagingParamStartValue = -1,
  pagingParamStartValue = -1,
  pagingType = 'IdProperty',
  enabled = true,
  refetchOnReconnect = true,
  refetchOnWindowFocus = true,
  refetchInterval = undefined
}: useInfiniteListProps<T, P>) =>
  useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = pagingParamStartValue }) => {
      if (matchScorePagingRequestParamKey) {
        const { matchScore, idblog } = pageParam;
        return queryFn({
          ...apiParam,
          [matchScorePagingRequestParamKey]:
            matchScore || matchScorePagingParamStartValue,
          [pagingRequestParamKey]: idblog || matchScorePagingParamStartValue
        });
      }
      return await queryFn({
        ...apiParam,
        [pagingRequestParamKey]: pageParam
      });
    },
    getNextPageParam: (lastPage, pages) => {
      if (pagingType === 'IdProperty') {
        const pagesLength = pages.length;
        const lastPage = pages[pagesLength - 1];
        const lastPageLength = lastPage.length;
        const lastItem = lastPage[lastPageLength - 1];

        // lastItem이 없으면 그 전 page의 last
        // 그전 페이지의 last를 못가져오는 경우 (더이상 array가 없음)
        // 그러면 다시 초기 값 -1
        if (!lastItem) {
          // pages[pagesLength - 2]

          if (pagesLength - 2 <= 0) {
            return -1;
          } else {
            // lastPage[lastPageLength - 1]

            // lastPrev는 콩글리쉬임. 맨 끝 바로 전을 의미합니다. by 최대욱
            const lastPrevPage = pages[pages.length - 2];
            const lastPrevItem = lastPrevPage[lastPrevPage.length - 1];
            return lastPrevPage[lastPrevPage.length - 1][
              pagingParamKey as keyof typeof lastPrevItem
            ];
          }
        }

        if (matchScorePagingParamKey) {
          const pageParam = {
            matchScore: lastItem[
              matchScorePagingParamKey as keyof typeof lastItem
            ] as number,
            idblog: lastItem[pagingParamKey as keyof typeof lastItem] as number
          };

          return pageParam;
        }

        return lastItem[pagingParamKey as keyof typeof lastItem] as number;
      } else if (pagingType === 'PageNumber') {
        return pages.length + 1;
      }
    },
    enabled: enabled,
    refetchOnReconnect,
    refetchOnWindowFocus,
    refetchInterval
  });

export type StoryRequestParam = {
  idblog: number;
  timeStamp: number;
} & AccessInfo;

export const getStory = async ({
  idblog,
  accessId,
  accesstoken,
  timeStamp
}: StoryRequestParam) =>
  (
    await axios.get(
      `/apis/getStory?idblog=${idblog}&accessId=${accessId}&accesstoken=${accesstoken}&timeStamp=${timeStamp}`
    )
  ).data.data;

export const useGetStory = (
  { idblog, accessId, accesstoken, timeStamp }: StoryRequestParam,
  options: Omit<
    UseQueryOptions<
      ApiResponse<StoryItem>,
      AxiosError<unknown, unknown>,
      StoryItem,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery<ApiResponse<StoryItem>, AxiosError, StoryItem>(
    storyKeys.all(idblog),
    () => {
      return getStory({ idblog, accessId, accesstoken, timeStamp });
    },
    options
  );

type UploadRepresentativeRequestParam = {
  img: File;
} & AccessInfo;

type UploadRepresentativeResponse = {
  filename: string;
};

const uploadRepresentativeStoryImage = async ({
  img,
  accessId,
  accesstoken
}: UploadRepresentativeRequestParam) =>
  (
    await axios.post(
      `/apis/uploadRepresentative`,
      {
        img,
        accesstoken,
        accessId
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  ).data.data;

export const useUploadRepresentativeStoryImage = () =>
  useMutation<
    UploadRepresentativeResponse,
    AxiosError,
    UploadRepresentativeRequestParam
  >(uploadRepresentativeStoryImage);
