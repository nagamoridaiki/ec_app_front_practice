import { useState, useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { fetchTodoDetailApi } from '../../../apis/productApi'
import { ProductType } from '../../../interfaces/product';

import { addCartItemApi, fetchCartListApi } from '@/apis/cartApi';
import { Cart, CartObject,  AddCartParams, fetchCartItem } from '../../../interfaces/cart';


type StatesType = {
  showCartItems: Array<fetchCartItem>
  prevCart: Array<CartObject>
  product: ProductType | undefined;
};

type ActionType = {
  fetchCartItems:  (user_id: number | undefined) => Promise<void>
  addToCart: (prevCart: Array<CartObject>, selectedUnit: Array<CartObject>, user_id: number) => Promise<void>
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
      setProduct(res?.data && typeof res.data === 'object' ? toProductUnitMessage(res.data) : undefined)
    }
  }, [router?.query?.id])

  const fetchCartItems = useCallback(async (user_id: number | undefined): Promise<void> => {
    if (!user_id) return
    const res = await fetchCartListApi(user_id);
    setShowCartItems(res?.data && typeof res.data === 'object' ? res.data : []);
  }, [showCartItems]);

  const addToCart = useCallback(async (prevCart: Array<CartObject>, selectedUnit: Array<CartObject>, user_id: number) => {
    // console.log("prevCartの中身", prevCart)
    // console.log("selectedUnitの中身", selectedUnit)
    // console.log("user_idの中身", user_id)

    if (selectedUnit.length > 0 && user_id) {
      const newCart = [...prevCart, ...selectedUnit];
      setCartItems(newCart);
      //console.log("newCartの中身", newCart)
      await addCartItemApi({
        user_id,
        add_cart_object: newCart.map(item => ({
          inventory_unit_id: item.inventoryUnitId,
          num: item.addToCartCount
        }))
      });
    } else {
      console.error('カートに入れる商品数を1以上選んでください');
    }
  }, [setCartItems]);

  const prevCart = useMemo(
    () => {
      const cartObject: Array<CartObject> = showCartItems.map(item => {
        return {
          inventoryUnitId: item.inventoryUnitId,
          addToCartCount: showCartItems.length
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
    prevCart,
    product,
  };

  const actions: ActionType = {
    fetchCartItems,
    addToCart
  }

  return [states, actions] as const
}

const toProductUnitMessage = (showProduct: ProductType) => {
  const { productId,
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