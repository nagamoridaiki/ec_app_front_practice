export interface Cart {
  cartId: number;
  title: string;
  note?: string;
  imageUrl?: string;
  inventories?: {
    inventryId: number,
    rank: string,
    price: number,
    inventoryNum: number,
    createdAt: string,
    updatedAt: string
  }[]
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

export interface fetchCartItem {
  cartId: number;
  inventoryId: number;
  cartInventoryId: number;
  inventoryNum: number;
  productId: number;
  rank: string;
  num: number;
  price: number;
  product_id: number;
  title: string;
  note?: string;
  imageUrl: string;
  created_at: string;
  updated_at: string;
  createdAt: string;
  updatedAt: string;
}

export interface existingCartItems {
  inventoryId: number;
  addToCartCount: number;
  cartId: number;
  cartInventoryId: number;
  imageUrl: string;
  inventoryNum: number;
  note: string | undefined;
  price: number;
  productId: number;
  rank: string;
  title: string;
}
