import { useState, useEffect, useCallback, useMemo } from 'react';
import { ProductType, MergedProductType, ProductInventoryType } from '@/interfaces/product';
import { Cart, CartObject,  AddCartParams, fetchCartItem, existingCartItems } from '@/interfaces/cart';

type Params = {
  setInCartProducts:  React.Dispatch<React.SetStateAction<MergedProductType[]>>
}

type StatesType = {
  removeFromCart: (inventoryId: number) => void
  updateQuantity: (inventoryId: number, newQuantity: number) => void
};

export const useCartTemplate = ({setInCartProducts}: Params) => {

  const removeFromCart = useCallback((inventoryId: number) => {
    setInCartProducts(prev => prev.filter(item => item.inventoryId !== inventoryId));
  }, []);

  const updateQuantity = useCallback((inventoryId: number, newQuantity: number) => {
    setInCartProducts(prev => prev.map(item =>
      item.inventoryId === inventoryId ? { ...item, inCartNum: newQuantity } : item
    ));
  }, []);

  const status: StatesType = {
    removeFromCart,
    updateQuantity
  }

  return [status] as const
}