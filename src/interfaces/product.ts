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

export interface CategoryType {
  categoryId: number;
  categoryName: string;
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

export interface RegisterProductParams {
  product_title: string;
  product_description: string| undefined;
  image_url: string | undefined;
  category_id: number;
}
