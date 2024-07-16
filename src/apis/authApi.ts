import { AxiosResponse } from 'axios';
import globalAxios, { ResponseType, isAxiosError, IErrorResponse } from './config';
import { AuthResponseType, signUpUser } from '@/interfaces/userType';

export const signUpApi = async (name: string, email: string, password: string) => {
  try {
    const { data } = await globalAxios.post('auth/sign_up', {
      name,
      email,
      password
    });
    const res: ResponseType<signUpUser> = {
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