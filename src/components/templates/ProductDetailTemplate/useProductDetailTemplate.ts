import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchTodoDetailApi } from '../../../apis/productApi'
import { ProductType, showProduct } from '../../../interfaces/product';

type StatesType = {
  product: showProduct | undefined;
};

export const useProductListTemplate = () => {
  const router = useRouter();
  const [product, setProduct] = useState<showProduct | undefined>(undefined)

  const fetchProductDetail = useCallback(async () => {
    const targetId = router?.query?.id;
    if (!!targetId && typeof targetId === 'string' && !Number.isNaN(Number(targetId))) {
      const res = await fetchTodoDetailApi(Number(targetId))
      console.log("resの中身", res)

      setProduct(res?.data && typeof res.data === 'object' ? toProductUnitMessage(res.data) : undefined)
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

const toProductUnitMessage = (showProduct: showProduct) => {
  const { productId,
    productTitle,
    productDescription,
    imageUrl,
    productUnitId,
    rank,
    price,
    createdAt,
    updatedAt
   } = showProduct;

   return {
    productId,
    productTitle,
    productDescription,
    imageUrl,
    productUnitId,
    rank,
    price,
    createdAt,
    updatedAt
  }
}