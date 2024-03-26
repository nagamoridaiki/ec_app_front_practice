import{ useState, useCallback, useEffect } from 'react';
import { ProductType } from '../interfaces/product';
import { fetchProductListApi } from '../apis/productApi';

export const ProductTodo = () => {

  // productを一覧にセッティングする変数
  const [productList, setProductList] = useState<Array<ProductType>>([])

  // product一覧を呼び出すAPIメソッド
  const fetchProductList = useCallback(async (): Promise<void> => {
    const res = await fetchProductListApi();
    setProductList(res?.data && typeof res.data === 'object' ? res.data : []);
  }, []);

  useEffect(() => {
    fetchProductList();
  }, [fetchProductList]);

  return {
    productList,
  }

}
