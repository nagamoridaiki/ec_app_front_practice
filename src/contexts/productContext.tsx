import { FC, ReactNode, useContext, createContext } from 'react';
import { useProduct } from '@/hooks/useProduct'
import { ProductType, CategoryType, RegisterProductParams } from '@/interfaces/product';

type Props = {
  children: ReactNode;
};

interface ProductContextType {
  productList: Array<ProductType>
  categoriesList: Array<CategoryType>
  registerProduct: (params: RegisterProductParams) => Promise<void>
  product?: ProductType
}

const ProductContext = createContext({} as ProductContextType);

export const ProductProvider: FC<Props> = ({ children }) => {

  const { productList, registerProduct, product, categoriesList } = useProduct();

  return (
    <ProductContext.Provider
      value={{
        productList,
        categoriesList,
        registerProduct,
        product
      }}
    >
      {children}
    </ProductContext.Provider>
  );

};

export const useProductContext = () => useContext(ProductContext);
