import axios, { AxiosError } from 'axios';

const BASE_API_URL = process.env.BASE_API_URL || 'http://localhost:8000';

export interface ResponseType<T = undefined> {
  code: number;
  data?: T;
  message?: string;
}

const globalAxios = axios.create({
  baseURL: `${BASE_API_URL}`,
  timeout: 1000,
  headers: {
    'Content-type': 'application/json',
  },
});


export default globalAxios;

export const isAxiosError = (error: any): error is AxiosError => !!error.isAxiosError;
