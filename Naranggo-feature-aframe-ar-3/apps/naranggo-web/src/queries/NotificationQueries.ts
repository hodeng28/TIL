import axios from '@/api/axiosClient';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

const notificationKeys = {
  all: ['notification'] as const
};

type NotificationRequestParam = {
  lastidalert: number;
} & AccessInfo;

const getNotificationList = async (params: NotificationRequestParam) =>
  (await axios.get<ApiResponse<AlertItem[]>>(`/apis/getAlertList`, { params }))
    .data.data;

export const useNotificationList = (params: NotificationRequestParam) =>
  useQuery<AlertItem[], AxiosError>(notificationKeys.all, () =>
    getNotificationList(params)
  );
