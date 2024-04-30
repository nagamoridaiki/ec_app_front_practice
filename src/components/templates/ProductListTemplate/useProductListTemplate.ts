import { useMemo, useState, useCallback, useEffect,  SetStateAction, Dispatch } from 'react';
import { ProductType, showProduct } from '@/interfaces/product';


type Params = {
  productList: Array<ProductType>
}

type StatesType = {
  showProductUnits: showProduct[];
  searchKeyword: string;
};


export const useProductListTemplate = ({productList}: Params) => {

  const [searchKeyword, setSearchKeyword] = useState('');

  const showProductList = useMemo(() => {
    return searchKeyword ?
    productList?.filter((product) => {
      const regexp = new RegExp('^' + searchKeyword, 'i');
      return product.productTitle?.match(regexp);
    }) : productList;
  }, [productList, searchKeyword]);

  const showProductUnits = toProductUnitMessage(showProductList)

  const status: StatesType = {
    showProductUnits,
    searchKeyword
  }

  const actions = {}

  return [status] as const
}

const toProductUnitMessage = (showProduct: Array<ProductType>): showProduct[] => {
  return showProduct?.flatMap(({ productId, productTitle, productDescription, imageUrl, productUnit }) =>
    productUnit?.map(unit => ({
      productId,
      productTitle,
      productDescription,
      imageUrl,
      ...unit
    })) || []
  );
}
