import axios from '@/api/axiosClient';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

type BlockRequestParam = {
  iduser: number;
} & AccessInfo;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BlockResponse {}

const block = async (params: BlockRequestParam) =>
  (await axios.post('/apis/setBlock', { ...params })).data;

export const useBlock = () =>
  useMutation<ApiResponse<BlockResponse>, AxiosError, BlockRequestParam>(block);

const unBlock = async (params: BlockRequestParam) =>
  (await axios.post('/apis/setUnBlock', { ...params })).data;

export const useUnBlock = () =>
  useMutation<ApiResponse<BlockResponse>, AxiosError, BlockRequestParam>(
    unBlock
  );
