import { AxiosResponse } from 'axios';
import globalAxios, { ResponseType, isAxiosError } from './config';
import { ProductType, RegisterProductParams, CategoryType } from '@/interfaces/product';
import { CreateSellingOrderParams, SellingOrderResponse } from '@/interfaces/sellingOrder';

export const createSellingOrderApi = async (params: CreateSellingOrderParams) => {
  try {
    console.log("sellingOrderAPiのparam", params)
    const { data } = await globalAxios.post('/sellingOrder', params);

    const res: ResponseType<SellingOrderResponse> = {
      code: 201,
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
