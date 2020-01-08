import axios, {AxiosResponse, AxiosError} from 'axios';
import { MessageBox } from 'element-ui';

const onResponse = <T = any> (rsp: AxiosResponse): Promise<AxiosResponse<T>> => {
  if (rsp.status === 200) {
    const result = rsp.data;
    if (result &&
        !result.success &&
        result.message) {
      MessageBox({
        type: 'error',
        message: result.message,
      });
    }
    return Promise.resolve(result);
  } else {
    console.error('网络请求错误');
  }
  return Promise.reject(rsp);
};

const onResponseError = (err: AxiosError) => {
  if ((err.response as any).status === 401) {
    window.location.href = '/login';
  }
  return Promise.reject(err);
};

export const createAxios = () => {
  const config = {
    baseURL: '/api',
    withCredentials: true,
    headers: {
      Authorization: 'eyJhbGciOiJIUzUxMiIsInppcCI6IkRFRiJ9.eNqqViouTVKyUgpwDXLzdYx3dPaJD3YNDvb094sP8fd29Yv3DA4OdQ1S0lEqzUxRsjI0NjIwtzAyMjG1NDE2sDQ0MtBRSkxOzi_NKwEakpiSm5nnUJBalJabqJecnwvUlVpRANRlam5mZmpsbmaso5SZWAITMDAECeQlpSEL1AIAAAD__w.J2IhB7GMukPDG8lf6hLWgB02BpyM3mzyZE69BZNRCNKkFtn_O5R9Rqiv2DJ_e-2yveCs4jBtF6db6MorZP9fUw',
    },
  };
  const http = axios.create(config);
  http.interceptors.response.use(onResponse, onResponseError);
  return http;
};

export const http = createAxios();
