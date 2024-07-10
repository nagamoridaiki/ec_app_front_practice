import { AxiosResponse } from 'axios';
import globalAxios, { ResponseType, isAxiosError } from './config';
import { ProductType, RegisterProductParams, CategoryType } from '../interfaces/product';
import { Cart, AddCartParams, fetchCartItem } from '../interfaces/cart';

export const addCartItemApi = async (params: AddCartParams) => {
  try {
    const { data } = await globalAxios.post('/cart', params);

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

export const fetchCartListApi = async (user_id: number) => {
  try {
    const { data } = await globalAxios.get(`/cart/users/${user_id}`);

    const res: ResponseType<Array<fetchCartItem>> = {
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

export const deleteCartItemApi = async (cart_inventory_id: number) => {
  try {
     await globalAxios.delete(`/cart/${cart_inventory_id}`);
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

export const updateCartInventoryNumApi = async (cart_inventory_id: number, num: number) => {
  try {
     await globalAxios.patch(`/cart/update_num/`, { cart_inventory_id, num});
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