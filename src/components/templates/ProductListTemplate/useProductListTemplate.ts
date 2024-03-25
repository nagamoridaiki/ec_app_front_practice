import { useMemo, useState, useCallback } from 'react';
import { ProductType } from '../../../interfaces/product';

type Params = {
  productList: Array<ProductType>
}


export const useProductListTemplate = ({productList}: Params) => {

  const [searchKeyword, setSearchKeyword] = useState('');

  const showProductList = useMemo(() => {
    const regexp = new RegExp('^' + searchKeyword, 'i');
    return productList?.filter((product) => {
      return product.name.match(regexp);
    });
  }, [productList, searchKeyword])

  const status = {
    showProductList,
    searchKeyword
  }

}