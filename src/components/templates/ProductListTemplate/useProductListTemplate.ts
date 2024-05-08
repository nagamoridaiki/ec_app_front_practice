import { useState, useEffect, useCallback, useMemo } from 'react';
import { ProductType } from '@/interfaces/product';

type Params = {
  productList: Array<ProductType>
}

type StatesType = {
  initialProductList: ProductType[];
  searchKeyword: string;
};

export const useProductListTemplate = ({productList}: Params) => {

  const [searchKeyword] = useState('');
  const [initialProductList, setInitialProductList] = useState<ProductType[]>([]);

  const showProductList = useCallback(() => {
    return searchKeyword ?
    productList?.filter((product) => {
      const regexp = new RegExp('^' + searchKeyword, 'i');
      return product.title?.match(regexp);
    }) : productList;
  }, [productList, searchKeyword]);

  useEffect(() => {
    setInitialProductList(showProductList());
  }, [showProductList]);

  const status: StatesType = {
    initialProductList,
    searchKeyword,
  }

  return [status] as const
}

