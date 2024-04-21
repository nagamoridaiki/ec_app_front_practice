import { AxiosResponse } from 'axios';
import globalAxios, { ResponseType, isAxiosError } from './config';
import { ProductType } from '../interfaces/product';

export const fetchProductListApi = async () => {
  try {
    const { data } = await globalAxios.get('/products');
    //console.log("APIレスポンス結果", data)

    const res: ResponseType<Array<ProductType>> = {
      code: 200,
      data
    };
    return res
  } catch (err) {
    const res: ResponseType = {
      code: 500,
      message: ''
    };
    if (isAxiosError(err)) {
      const axiosError = err as IErrorResponse;
      res.code = axiosError.response.status;
      res.message = axiosError.response.data.message;
    }
    return res;
  }
}

export const fetchTodoDetailApi = async(id: number) => {
  try {
    const { data }: AxiosResponse<ProductType> = await globalAxios.get(`/products/${id}`);
    const res: ResponseType<ProductType> = {
      code: 200,
      data
    }
    return res
  } catch (err) {
    const res: ResponseType = {
      code: 500,
      message: ''
    }
    if (isAxiosError(err)) {
      const axiosError = err as IErrorResponse;
      res.code = axiosError.response.status
      res.message = axiosError.response.data.message
    }
    return res
  }
}

export interface IErrorResponse {
  code: string;
  config: any;
  message: string;
  request: any;
  response: {
    config: any;
    data: {
      error: string;
      message: string;
      statusCode: string;
    };
    headers: any;
    request: any;
    status: number;
    statusText: string;
  };
}