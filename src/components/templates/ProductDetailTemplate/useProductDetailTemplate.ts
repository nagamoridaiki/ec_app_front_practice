import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchTodoDetailApi } from '../../../apis/productApi'
import { ProductType } from '../../../interfaces/product';

type StatesType = {
  product: ProductType | undefined;
};

export const useProductListTemplate = () => {
  const router = useRouter();
  const [product, setProduct] = useState<ProductType | undefined>(undefined)

  const fetchProductDetail = useCallback(async () => {
    const targetId = router?.query?.id;
    if (!!targetId && typeof targetId === 'string' && !Number.isNaN(Number(targetId))) {
      const res = await fetchTodoDetailApi(Number(targetId))
      console.log("resの中身", res)
      setProduct(res?.data && typeof res.data === 'object' ? res.data : undefined)
    }
  }, [router?.query?.id])

  useEffect(() => {
    fetchProductDetail();
  }, [fetchProductDetail]);

  const states: StatesType = {
    product,
  };

  return [states] as const
}
