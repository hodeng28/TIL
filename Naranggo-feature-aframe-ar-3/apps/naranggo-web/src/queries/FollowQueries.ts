import axios from '@/api/axiosClient';
import { useMutation, useQueryClient } from 'react-query';
import produce from 'immer';

interface FollowParams extends AccessInfo {
  nickname: string;
  iduser: number;
}

interface UnfollowParams extends AccessInfo {
  iduser: number;
}

type QueryKey = ['followingList'] | ['getStoryRead', number];

const follow = async (params: FollowParams) =>
  await axios.post(`/apis/setFollow`, { ...params });

const unfollow = async (params: UnfollowParams) =>
  await axios.post(`/apis/setUnFollow`, { ...params });

export const useFollowQuery = (queryKey: QueryKey) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: follow,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const snapShotOfPreviousData =
        queryClient.getQueryData<ApiResponse<StoryItem>>(queryKey);

      if (snapShotOfPreviousData) {
        queryClient.setQueryData<ApiResponse<StoryItem>>(
          queryKey,
          produce(snapShotOfPreviousData, (draft) => {
            draft.data.isfollow = 1;
          })
        );
      }

      return {
        snapShotOfPreviousData
      };
    }
  });
};

export const useUnFollowQuery = (queryKey: QueryKey) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unfollow,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const snapShotOfPreviousData =
        queryClient.getQueryData<ApiResponse<StoryItem>>(queryKey);

      if (snapShotOfPreviousData) {
        queryClient.setQueryData<ApiResponse<StoryItem>>(
          queryKey,
          produce(snapShotOfPreviousData, (draft) => {
            draft.data.isfollow = 0;
          })
        );
      }

      return {
        snapShotOfPreviousData
      };
    }
  });
};
