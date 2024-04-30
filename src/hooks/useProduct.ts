import{ useState, useCallback, useEffect } from 'react';
import { ProductType, CategoryType, RegisterProductParams } from '@/interfaces/product';
import { fetchProductListApi, registerProductApi, fetchCategoriesListApi } from '@/apis/productApi';

export const useProduct = () => {

  // productを一覧にセッティングする変数
  const [productList, setProductList] = useState<Array<ProductType>>([])
  const [categoriesList, setCategoriesList] = useState<Array<CategoryType>>([])

   // productを一覧にセッティングする変数
   const [product, setProduct] = useState<ProductType>()

  // product一覧を呼び出すAPIメソッド
  const fetchProductList = useCallback(async (): Promise<void> => {
    const res = await fetchProductListApi();
    setProductList(res?.data && typeof res.data === 'object' ? res.data : []);
  }, []);

  // product登録
    const registerProduct = useCallback(async (params: RegisterProductParams): Promise<void> => {
    const res = await registerProductApi(params);
    if (res?.data && typeof res.data === 'object') return;
    setProduct(res?.data);
  }, []);

  // product一覧を呼び出すAPIメソッド
  const fetchCategoriesList = useCallback(async (): Promise<void> => {
    const res = await fetchCategoriesListApi();
    setCategoriesList(res?.data && typeof res.data === 'object' ? res.data : []);
  }, []);


  useEffect(() => {
    fetchProductList();
    fetchCategoriesList();
  }, [fetchProductList, fetchCategoriesList]);

  return {
    productList,
    categoriesList,
    registerProduct,
    product
  }

}
