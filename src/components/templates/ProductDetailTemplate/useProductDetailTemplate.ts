import { useState, useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { fetchTodoDetailApi } from '../../../apis/productApi'
import { ProductType } from '../../../interfaces/product';

import { fetchCartListApi } from '@/apis/cartApi';
import { CartObject, fetchCartItem } from '../../../interfaces/cart';


type StatesType = {
  showCartItems: Array<fetchCartItem>
  existingCartItems: Array<CartObject>
  product: ProductType | undefined;
};

type ActionType = {
  fetchCartItems:  (user_id: number | undefined) => Promise<void>
};

export const useProductDetailTemplate = (user_id: number| undefined) => {
  const router = useRouter();
  const [product, setProduct] = useState<ProductType | undefined>(undefined)
  const [cartItems, setCartItems] = useState<Array<CartObject>>([])
  const [showCartItems, setShowCartItems] = useState<Array<fetchCartItem>>([]);

  const fetchProductDetail = useCallback(async () => {
    const targetId = router?.query?.id;
    if (!!targetId && typeof targetId === 'string' && !Number.isNaN(Number(targetId))) {
      const res = await fetchTodoDetailApi(Number(targetId))
      setProduct(res?.data && typeof res.data === 'object' ? toProductMessage(res.data) : undefined)
    }
  }, [router?.query?.id])

  const fetchCartItems = useCallback(async (user_id: number | undefined): Promise<void> => {
    if (!user_id) return
    const res = await fetchCartListApi(user_id);
    setShowCartItems(res?.data && typeof res.data === 'object' ? res.data : []);
  }, [showCartItems]);

  const existingCartItems = useMemo(
    () => {
      const cartObject: Array<CartObject> = showCartItems.map(item => {
        return {
          inventoryId: item.inventoryId,
          addToCartCount: item.num
        }
      })
      return cartObject
    }, [showCartItems]
  )

  useEffect(() => {
    fetchProductDetail();
    fetchCartItems(user_id);
  }, [fetchProductDetail]);

  const states: StatesType = {
    showCartItems,
    existingCartItems,
    product,
  };

  const actions: ActionType = {
    fetchCartItems,
  }

  return [
    states,
    actions
  ] as const
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