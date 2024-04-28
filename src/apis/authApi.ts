import { AxiosResponse } from 'axios';
import globalAxios, { ResponseType, isAxiosError, IErrorResponse } from './config';
import { AuthResponseType } from '@/interfaces/userType';

export const signInApi = async (email: string, password: string) => {
  try {
    const { data } = await globalAxios.post('auth/login', {
      email,
      password
    });
    console.log("dataの中身", data)
    const res: ResponseType<AuthResponseType> = {
      code: 200,
      data,
    };
    return res;
  } catch (err) {
    const res: ResponseType = {
      code: 500,
      message: '',
    };
    if (isAxiosError(err)) {
      const axiosError = err as IErrorResponse;
      res.code = axiosError.response.status;
      res.message = axiosError.response.data.message;
    }
    return res;
  }
}

export const authenticationApi = async () => {
  try {
    const { data }: AxiosResponse<AuthResponseType> = await globalAxios.post('/auth/authentication/');
    const res: ResponseType<AuthResponseType> = {
      code: 200,
      data,
    };
    return res;
  } catch (err) {
    const res: ResponseType = {
      code: 500,
      message: '',
    };
    if (isAxiosError(err)) {
      const axiosError = err as IErrorResponse;
      res.code = axiosError.response.status;
      res.message = axiosError.response.data.message;
    }
    return res;
  }
};