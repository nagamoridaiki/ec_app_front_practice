import { FC, ReactNode, useContext, createContext } from 'react';
import { ProductType } from '../interfaces/product';
import { ProductTodo } from '../hooks/product'

type Props = {
  children: ReactNode;
};

interface ProductContextType {
  productList: Array<ProductType>
}

const ProductContext = createContext({} as ProductContextType);

export const ProductProvider: FC<Props> = ({ children }) => {

  const { productList, } = ProductTodo();

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
