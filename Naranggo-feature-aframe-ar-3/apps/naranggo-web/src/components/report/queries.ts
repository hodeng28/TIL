import axios from '@/api/axiosClient';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

type ReportStoryRequestParam = {
  iduser: number;
  idblog: number;
  reporttype: number;
  message: string;
  iswithblock: number;
} & AccessInfo;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ReportStoryResponse {}

const reportStory = async (params: ReportStoryRequestParam) =>
  (await axios.post('/apis/setReportStory', { ...params })).data;

export const useReportStory = () =>
  useMutation<
    ApiResponse<ReportStoryResponse>,
    AxiosError,
    ReportStoryRequestParam
  >(reportStory);

type ReportReplyRequestParam = {
  iduser: number;
  idreply: string;
  idrereply: string;
  reporttype: number;
  message: string;
  iswithblock: number;
} & AccessInfo;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ReportReplyResponse {}

const reportReply = async (params: ReportReplyRequestParam) =>
  (await axios.post('/apis/setReportReply', { ...params })).data;

export const useReportReply = () =>
  useMutation<
    ApiResponse<ReportReplyResponse>,
    AxiosError,
    ReportReplyRequestParam
  >(reportReply);

type ReportUserRequestParam = {
  iduser: number;
  reporttype: number;
  message: string;
  iswithblock: number;
} & AccessInfo;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ReportUserResponse {}

const reportUser = async (params: ReportUserRequestParam) =>
  (await axios.post('/apis/setReportUser', { ...params })).data;

export const useReportUser = () =>
  useMutation<
    ApiResponse<ReportUserResponse>,
    AxiosError,
    ReportUserRequestParam
  >(reportUser);
