import { AxiosResponse } from 'axios';
import globalAxios, { ResponseType, isAxiosError } from './config';
import { ProductType, showProduct, RegisterProductParams, CategoryType } from '../interfaces/product';

export const registerProductApi = async (params: RegisterProductParams) => {
  try {
    const { data } = await globalAxios.post('/products', params);
    console.log("APIレスポンス結果", data)

    const res: ResponseType<ProductType> = {
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


export const fetchCategoriesListApi = async () => {
  try {
    const { data } = await globalAxios.get('/products/category');
    //console.log("APIレスポンス結果", data)

    const res: ResponseType<Array<CategoryType>> = {
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
    const { data }: AxiosResponse<showProduct> = await globalAxios.get(`/products/${id}`);
    const res: ResponseType<showProduct> = {
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