import styles from './styles.module.css';
import React, { FC } from 'react';
import { CartObject, fetchCartItem } from '../../../interfaces/cart';

type Props = {
  buttonText: string;
  buttonStyle: string;
  addToCart?: (prevCart: CartObject[], selectedUnit: CartObject[], userId: number) => Promise<void>
  prevCart?: Array<CartObject>
  selectedUnit?: CartObject[]
  userId?: number
}

export const CommonButton: FC<Props> = ({ buttonText, buttonStyle, addToCart, prevCart, selectedUnit, userId }) => {
  return (
    <button type="submit" className={styles[buttonStyle]}
      onClick={() => prevCart && selectedUnit && userId && addToCart && addToCart(prevCart, selectedUnit, userId)}
    >
      {buttonText}
    </button>
  )
}
