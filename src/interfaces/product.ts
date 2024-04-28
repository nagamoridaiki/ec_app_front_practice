export interface ProductType {
  productId: number;
  productTitle: string;
  productDescription?: string;
  imageUrl?: string;
  productUnit?: {
    productUnitId: number,
    rank: string,
    price: number,
    createdAt: string,
    updatedAt: string
  }[]
}

export interface showProduct {
  productUnitId: number;
  rank: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  productId: number;
  productTitle: string;
  productDescription: string | undefined;
  imageUrl: string | undefined;
}
