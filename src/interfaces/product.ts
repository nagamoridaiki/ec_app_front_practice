export interface ProductType {
  productId: number;
  title: string;
  note?: string;
  imageUrl?: string;
  inventories?: {
    inventoryId: number,
    rank: string,
    price: number,
    inventoryNum: number,
    createdAt: string,
    updatedAt: string
  }[]
}

export interface CategoryType {
  categoryId: number;
  categoryName: string;
}

export interface RegisterProductParams {
  title: string;
  note: string| undefined;
  image_url: string | undefined;
  category_id: number;
}
