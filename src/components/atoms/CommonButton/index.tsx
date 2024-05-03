import styles from './styles.module.css';
import React, { FC } from 'react';
import { CartObject, fetchCartItem } from '../../../interfaces/cart';

type Props = {
  buttonText: string;
  buttonStyle: string;
  addToCart?: (existingCartItems: CartObject[], selected: CartObject[], userId: number) => Promise<void>
  existingCartItems?: Array<CartObject>
  selected?: CartObject[]
  userId?: number
}

export const CommonButton: FC<Props> = ({ buttonText, buttonStyle, addToCart, existingCartItems, selected, userId }) => {
  return (
    <button type="submit" className={styles[buttonStyle]}
      onClick={() => existingCartItems && selected && userId && addToCart && addToCart(existingCartItems, selected, userId)}
    >
      {buttonText}
    </button>
  )
}
