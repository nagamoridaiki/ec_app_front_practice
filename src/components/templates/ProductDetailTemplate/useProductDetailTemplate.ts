import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchProductDetailApi } from '../../../apis/productApi'
import { ProductType } from '../../../interfaces/product';

type StatesType = { product: ProductType | undefined };

export const useProductDetailTemplate = (user_id: number| undefined) => {
  const router = useRouter();
  const [product, setProduct] = useState<ProductType | undefined>(undefined)

  const fetchProductDetail = useCallback(async () => {
    const targetId = router?.query?.id;
    if (!!targetId && typeof targetId === 'string' && !Number.isNaN(Number(targetId))) {
      const res = await fetchProductDetailApi(Number(targetId))
      setProduct(res?.data && typeof res.data === 'object' ? toProductMessage(res.data) : undefined)
    }
  }, [router?.query?.id])

  useEffect(() => {
    fetchProductDetail();
  }, [fetchProductDetail]);

  const states: StatesType = { product };

  return [ states ] as const
}

const toProductMessage = (showProduct: ProductType) => {
  const {
    productId,
    title,
    note,
    imageUrl,
    inventories,
   } = showProduct;

   return {
    productId,
    title,
    note,
    imageUrl,
    inventories,
  }
}