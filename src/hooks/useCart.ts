import{ useState, useCallback, useEffect, useMemo } from 'react';
import { ProductType, CategoryType, RegisterProductParams } from '@/interfaces/product';
import { fetchProductListApi, registerProductApi, fetchCategoriesListApi } from '@/apis/productApi';
import { Cart, CartObject,  AddCartParams, fetchCartItem } from '../interfaces/cart';
import { UserType } from '@/interfaces/userType'
import { addCartItemApi, fetchCartListApi } from '@/apis/cartApi';
import { authenticationApi } from '@/apis/authApi';
import { useAuthContext } from '@/contexts/AuthContext';
import { NAVIGATION_LIST, NAVIGATION_PATH } from '@/constants/navigation';

export const useCart = () => {

  const [cartItems, setCartItems] = useState<Array<CartObject>>([])
  const [showCartItems, setShowCartItems] = useState<Array<fetchCartItem>>([]);

  const addToCart = useCallback(async (existingCartItems: Array<CartObject>, selectedUnit: Array<CartObject>, userId: number) => {

    if (selectedUnit.length > 0 && userId) {
      const newCart = [...existingCartItems, ...selectedUnit];
      setCartItems(newCart);

      let uniqueCart
      uniqueCart = newCart.reduceRight((acc: CartObject[], item: CartObject) => {
        const found = acc.find(x => x.inventoryId === item.inventoryId);
        if (!found) {
          acc.push(item);
        }
        return acc;
      }, []);
      if (uniqueCart) {
        await addCartItemApi({
          user_id: userId,
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
    addToCart
  }, []);

  return {
    showCartItems,
    existingCartItems,
    addToCart
  }
}
