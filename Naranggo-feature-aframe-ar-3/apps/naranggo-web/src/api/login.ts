import axios from './axiosClient';

export const loginNRG = (loginParams: LoginParams) =>
  axios.post('/apis/userlogin', loginParams).then((res) => res.data);

export const linkAccount = (param: AccountLinkRequestParam) =>
  axios.post('/apis/accountlink', param).then((res) => res.data);

export const unLinkAccount = (param: AccountUnLinkRequestParam) =>
  axios.post('/apis/accountUnlink', param).then((res) => res.data);

export const accountWithdraw = (param: AccessInfo) =>
  axios.post('/apis/accountWithdraw', param).then((res) => res.data);

export const accountCreate = (param: AccountCreateRequestParam) =>
  axios.post('/apis/accountCreate', param).then((res) => res.data);
