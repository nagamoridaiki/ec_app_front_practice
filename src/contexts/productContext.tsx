import { FC, ReactNode, useContext, createContext } from 'react';
import { useProduct } from '@/hooks/useProduct'
import { ProductType } from '@/interfaces/product';

type Props = {
  children: ReactNode;
};

interface ProductContextType {
  productList: Array<ProductType>
}

const ProductContext = createContext({} as ProductContextType);

export const ProductProvider: FC<Props> = ({ children }) => {

  const { productList } = useProduct();

  return (
    <ProductContext.Provider
      value={{
        productList
      }}
    >
      {children}
    </ProductContext.Provider>
  );

};

export const useProductContext = () => useContext(ProductContext);
