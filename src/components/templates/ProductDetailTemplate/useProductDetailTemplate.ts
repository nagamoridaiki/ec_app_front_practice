import { useState, useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { fetchTodoDetailApi } from '../../../apis/productApi'
import { ProductType } from '../../../interfaces/product';

import { addCartItemApi, fetchCartListApi } from '@/apis/cartApi';
import { Cart, CartObject,  AddCartParams, fetchCartItem } from '../../../interfaces/cart';


type StatesType = {
  showCartItems: Array<fetchCartItem>
  existingCartItems: Array<CartObject>
  product: ProductType | undefined;
};

type ActionType = {
  fetchCartItems:  (user_id: number | undefined) => Promise<void>
  addToCart: (existingCartItems: Array<CartObject>, selectedUnit: Array<CartObject>, user_id: number) => Promise<void>
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
      //console.log("productの中身", product)
    }
  }, [router?.query?.id])

  const fetchCartItems = useCallback(async (user_id: number | undefined): Promise<void> => {
    if (!user_id) return
    const res = await fetchCartListApi(user_id);
    //console.log("res.dataの中身", res.data) //inventory_unit_id:33
    setShowCartItems(res?.data && typeof res.data === 'object' ? res.data : []);
  }, [showCartItems]);

  const addToCart = useCallback(async (existingCartItems: Array<CartObject>, selectedUnit: Array<CartObject>, user_id: number) => {
    // console.log("existingCartItemsの中身", existingCartItems)
    // console.log("selectedUnitの中身", selectedUnit)
    // console.log("user_idの中身", user_id)

    if (selectedUnit.length > 0 && user_id) {
      const newCart = [...existingCartItems, ...selectedUnit];
      setCartItems(newCart);

      let uniqueCart
      if (newCart.length > 2) {
        uniqueCart = newCart.reduceRight((acc: CartObject[], item: CartObject) => {
          const found = acc.find(x => x.inventoryId === item.inventoryId);
          if (!found) {
            acc.push(item);
          }
          return acc;
        }, []);
      }
      if (uniqueCart) {
        await addCartItemApi({
          user_id,
          add_cart_object: uniqueCart.map(item => ({
            inventory_id: item.inventoryId,
            num: item.addToCartCount
          }))
        });
        setCartItems([]);
        selectedUnit = [];
      }

    } else {
      console.error('カートに入れる商品数を1以上選んでください');
    }
  }, [setCartItems]);

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
    addToCart
  }

  return [states, actions] as const
}

const toProductMessage = (showProduct: ProductType) => {
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