import { useMemo, useState } from 'react';
import { ProductType, showProduct } from '@/interfaces/product';

type Params = {
  productList: Array<ProductType>
}

type StatesType = {
  showProductUnits: ProductType[];
  searchKeyword: string;
};


export const useProductListTemplate = ({productList}: Params) => {

  const [searchKeyword, setSearchKeyword] = useState('');

  const showProductList = useMemo(() => {
    return searchKeyword ?
    productList?.filter((product) => {
      const regexp = new RegExp('^' + searchKeyword, 'i');
      return product.title?.match(regexp);
    }) : productList;
  }, [productList, searchKeyword]);

  const showProductUnits = showProductList

  const status: StatesType = {
    showProductUnits,
    searchKeyword
  }

  const actions = {}

  return [status] as const
}

