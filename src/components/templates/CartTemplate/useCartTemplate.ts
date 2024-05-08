import { useState, useEffect, useCallback, useMemo } from 'react';
import { ProductType } from '@/interfaces/product';
import { Cart, CartObject,  AddCartParams, fetchCartItem, existingCartItems } from '@/interfaces/cart';

type Params = {
  productList: Array<ProductType>
  existingCartItems: Array<existingCartItems>
}

type ProductInventoryType = {
  productId: number;
  imageUrl: string | undefined;
  title: string;
  inventoryId: number;
  price: number;
  rank: string;
  inventoryNum: number;
};

type MergedProductType = ProductInventoryType & {
  inCartNum: number;
};

type StatesType = {
  inCartProducts: MergedProductType[]
  removeFromCart: (inventoryId: number) => void
  updateQuantity: (inventoryId: number, newQuantity: number) => void
};

export const useCartTemplate = ({productList, existingCartItems}: Params) => {

  const [ productInventories, setProductInventories ] = useState<ProductInventoryType[]>([]);

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

  useEffect(() => {
    setProductInventories(inventories);
  }, [inventories]);

  const [ inCartProducts, setInCartProducts ] = useState<MergedProductType[]>([]);

  const mergeProductsWithCart = useCallback(() => {
    const mergedProducts = existingCartItems.map(cartItem => {
      const foundProduct = productInventories.find(product => product.inventoryId === cartItem.inventoryId);

      if (foundProduct) {
        return {
          ...foundProduct,
          inCartNum: cartItem.addToCartCount
        } as MergedProductType;
      } else {
        return null;
      }
    }).filter(product => product !== null) as MergedProductType[];

    setInCartProducts(mergedProducts);
  }, [productInventories, existingCartItems]);

  const removeFromCart = useCallback((inventoryId: number) => {
    setInCartProducts(prev => prev.filter(item => item.inventoryId !== inventoryId));
  }, []);

  const updateQuantity = useCallback((inventoryId: number, newQuantity: number) => {
    setInCartProducts(prev => prev.map(item =>
      item.inventoryId === inventoryId ? { ...item, inCartNum: newQuantity } : item
    ));
  }, []);

  useEffect(() => {
    setProductInventories(inventories);
  }, [inventories]);

  useEffect(() => {
    mergeProductsWithCart();
  }, [productInventories, existingCartItems]);

  const status: StatesType = {
    inCartProducts,
    removeFromCart,
    updateQuantity
  }

  return [status] as const
}