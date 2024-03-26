import { useMemo, useState, useCallback } from 'react';
import { ProductType } from '../../../interfaces/product';

type Params = {
  productList: Array<ProductType>
}

type StatesType = {
  showProductList: Array<ProductType>;
  searchKeyword: string;
};

export const useProductListTemplate = ({productList}: Params) => {

  const [searchKeyword, setSearchKeyword] = useState('');

  const showProductList = useMemo(() => {
    if (searchKeyword) {
      const regexp = new RegExp('^' + searchKeyword, 'i');
      return productList?.filter((product) => {
        return product.title?.match(regexp);
      });
    } else {
      return productList
    }
  }, [productList, searchKeyword])

  const status: StatesType = {
    showProductList,
    searchKeyword
  }

  const actions = {}

  return [status] as const
}