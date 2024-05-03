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
    inventory_unit_id: number,
    num: number
  }[]
}

export interface CartObject {
  inventoryUnitId: number,
  addToCartCount: number
}

export interface fetchCartItem {
  inventoryUnitId: number;
  productId: number;
  rank: string;
  price: number;
  products: {
    product_id: number;
    title: string;
    note?: string;
    image_url: string;
    created_at: string;
    updated_at: string;
  };
  createdAt: string;
  updatedAt: string;
}
