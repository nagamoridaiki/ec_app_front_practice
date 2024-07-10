import { useCallback } from 'react';
import { MergedProductType } from '@/interfaces/product';
import { deleteCartItemApi, updateCartInventoryNumApi } from '@/apis/cartApi';

type Params = {
  setInCartProducts:  React.Dispatch<React.SetStateAction<MergedProductType[]>>
}

type StatesType = {
  removeFromCart: (inventoryId: number) => void
  updateQuantity: (inventoryId: number, newQuantity: number) => void
};

export const useCartTemplate = ({setInCartProducts}: Params) => {

  // カートの商品を削除した場合
  const removeFromCart = useCallback((inventoryId: number) => {
    setInCartProducts(prev => {
      const itemToRemove = prev.find(item => item.inventoryId === inventoryId);
      if (itemToRemove) {
        deleteCartItemApi(itemToRemove.cartInventoryId);
      }
      return prev.filter(item => item.inventoryId !== inventoryId);
    });
  }, []);

  // カートの中にある数量を変更した場合
  const updateQuantity = useCallback((inventoryId: number, newQuantity: number) => {
    setInCartProducts(prev => {
      const updatedProducts = prev.map(item =>
        item.inventoryId === inventoryId ? { ...item, inCartNum: newQuantity } : item
      );
      const itemToUpdate = prev.find(item => item.inventoryId === inventoryId);
      if (itemToUpdate) {
        updateCartInventoryNumApi(itemToUpdate.cartInventoryId, newQuantity);
      }
      return updatedProducts;
    });
  }, []);

  const status: StatesType = {
    removeFromCart,
    updateQuantity
  }

  return [status] as const
}