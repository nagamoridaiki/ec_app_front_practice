import {InventoryType, ProductType } from './product'

export interface Cart {
  cartId: number;
  title: string;
  note?: string;
  imageUrl?: string;
  inventories?: InventoryType[]
}

export interface AddCartParams {
  user_id: number,
  add_cart_object: {
    inventory_id: number,
    num: number
  }[]
}

export interface CartObject {
  inventoryId: number,
  addToCartCount: number
}

export type fetchCartItem = {
  cartId: number;
  cartInventoryId: number;
  num: number;
} & InventoryType & ProductType

export type existingCartItems = {
  addToCartCount: number;
  cartId: number;
  cartInventoryId: number;
} & ProductType & InventoryType
