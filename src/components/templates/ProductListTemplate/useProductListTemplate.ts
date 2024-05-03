import { useMemo, useState, useEffect, useCallback } from 'react';
import { ProductType } from '@/interfaces/product';

type Params = {
  productList: Array<ProductType>
  user_id: number | undefined;
}

type StatesType = {
  showProductList: ProductType[];
  searchKeyword: string;
};


export const useProductListTemplate = ({productList, user_id}: Params) => {

  const [searchKeyword] = useState('');

  const showProductList = useMemo(() => {
    return searchKeyword ?
    productList?.filter((product) => {
      const regexp = new RegExp('^' + searchKeyword, 'i');
      return product.title?.match(regexp);
    }) : productList;
  }, [productList, searchKeyword]);


  const status: StatesType = {
    showProductList,
    searchKeyword,
  }


  return [status] as const
}

