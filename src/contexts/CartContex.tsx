import { FC, ReactNode, useContext, createContext, SetStateAction, Dispatch } from 'react';
import { UserType } from '@/interfaces/userType';
import { useCart } from '@/hooks/useCart';
import { Cart, CartObject,  AddCartParams, fetchCartItem } from '../interfaces/cart';

type Props = {
  children: ReactNode;
};

interface ContextInterface {
  showCartItems: Array<fetchCartItem>
  existingCartItems: Array<CartObject>
  addToCart: (existingCartItems: Array<CartObject>, selectedUnit: Array<CartObject>, userId: number) => Promise<void>
}

const CartContext = createContext({} as ContextInterface);

export const CartProvider: FC<Props> = ({ children }) => {
  const {
    showCartItems,
    existingCartItems,
    addToCart
  } = useCart();

  return (
    <CartContext.Provider
      value={{
        showCartItems,
        existingCartItems,
        addToCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
