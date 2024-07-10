import { useState, useCallback, useEffect, useMemo } from 'react';
import { ProductType, MergedProductType, ProductInventoryType } from '@/interfaces/product';
import { CartObject, fetchCartItem, existingCartItems } from '../interfaces/cart';
import { addCartItemApi, fetchCartListApi } from '@/apis/cartApi';
import { useLimitedEffect } from './useLimitedEffect';

export const useCart = (user_id: number | undefined, productList: Array<ProductType> = []) => {
  const [cartItems, setCartItems] = useState<Array<CartObject>>([]);
  const [showCartItems, setShowCartItems] = useState<Array<fetchCartItem>>([]);
  const [inCartProducts, setInCartProducts] = useState<MergedProductType[]>([]);
  const [productInventories, setProductInventories] = useState<ProductInventoryType[]>([]);

  const fetchCartItems = useCallback(async (user_id: number | undefined): Promise<void> => {
    if (!user_id) return;
    const res = await fetchCartListApi(user_id);
    setShowCartItems(res?.data && typeof res.data === 'object' ? res.data : []);
  }, []);

  const addToCart = useCallback(async (existingCartItems: Array<CartObject>, selectedUnit: Array<CartObject>, userId: number) => {
    if (selectedUnit.length > 0 && userId) {
      const newCart = [...existingCartItems, ...selectedUnit];
      setCartItems(newCart);

      const uniqueCart = newCart.reduceRight((acc: CartObject[], item: CartObject) => {
        const found = acc.find(x => x.inventoryId === item.inventoryId);
        if (!found) {
          acc.push(item);
        }
        return acc;
      }, []);

      if (uniqueCart.length > 0) {
        await addCartItemApi({
          user_id: userId,
          add_cart_object: uniqueCart.map(item => ({
            inventory_id: item.inventoryId,
            num: item.addToCartCount
          }))
        });
        setCartItems([]);
      }
    } else {
      console.error('カートに入れる商品数を1以上選んでください');
    }
  }, []);

  const existingCartItemsMemo = useMemo(() => {
    return showCartItems.map(item => ({
      inventoryId: item.inventoryId,
      addToCartCount: item.num,
      cartId: item.cartId,
      cartInventoryId: item.cartInventoryId,
      imageUrl: item.imageUrl,
      inventoryNum: item.inventoryNum,
      note: item.note,
      price: item.price,
      productId: item.productId,
      rank: item.rank,
      title: item.title
    }));
  }, [showCartItems]);

  const inventories = useMemo(() => productList.flatMap(product => {
    return product.inventories ? product.inventories.map(inventory => ({
      productId: product.productId,
      imageUrl: product.imageUrl || '',
      title: product.title,
      inventoryId: inventory.inventoryId,
      price: inventory.price,
      rank: inventory.rank,
      inventoryNum: inventory.inventoryNum
    })) : [];
  }), [productList]);

  useLimitedEffect(() => {
    setProductInventories(inventories);
  }, [inventories], 10);

  const mergeProductsWithCart = useCallback(() => {
    const mergedProducts = existingCartItemsMemo.map(cartItem => {
      const foundProduct = productInventories.find(product => product.inventoryId === cartItem.inventoryId);
      if (foundProduct) {
        return {
          ...foundProduct,
          inCartNum: cartItem.addToCartCount,
          cartInventoryId: cartItem.cartInventoryId
        } as MergedProductType;
      } else {
        return null;
      }
    }).filter(product => product !== null) as MergedProductType[];

    setInCartProducts(mergedProducts);
  }, [existingCartItemsMemo]);

  useLimitedEffect(() => {
    if (user_id) {
      fetchCartItems(user_id);
    }
  }, [user_id], 10);

  useLimitedEffect(() => {
    mergeProductsWithCart();
  }, [mergeProductsWithCart], 10);

  return {
    fetchCartItems,
    showCartItems,
    existingCartItems: existingCartItemsMemo,
    addToCart,
    inCartProducts,
    setInCartProducts
  };
}
