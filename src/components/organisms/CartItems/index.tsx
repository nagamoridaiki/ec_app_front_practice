import React, { FC, useState } from 'react';

import styles from './styles.module.css';
import { MergedProductType } from '@/interfaces/product';
import { FaTrash } from 'react-icons/fa';

type Props = {
  inCartProducts: MergedProductType[],
  removeFromCart: (inventoryId: number) => void
  updateQuantity: (inventoryId: number, newQuantity: number) => void
}

export const CartItems: FC<Props> = ({ inCartProducts, removeFromCart, updateQuantity }) => {

  return (
    <div className={styles.cartDetails}>
      <h1>カートの中身</h1>
      {inCartProducts.map(item => (
      <div className={styles.cartItem} key={item.inventoryId}>
        <img src={item.imageUrl} alt="Product" className={styles.cartItemImage} />
        <div className={styles.cartItemDescription}>
          <div className={styles.cartItemInfo}>
            <h2 className={styles.cartItemTitle}>{item.title}</h2>
            <p className={styles.cartItemPrice}>ランク{item.rank} - {item.price}円</p>
          </div>
        </div>
        <div className={styles.cartItemActions}  key={item.inventoryId}>
          <button className={styles.cartItemRemove} onClick={() => removeFromCart(item.inventoryId)}>
            Remove <FaTrash />
          </button>
          <div className={styles.quantityControls}>
            <select defaultValue={item.inCartNum} className={styles.quantityInput} onChange={(e) => updateQuantity(item.inventoryId, parseInt(e.target.value))}>
              {Array.from({ length: item.inventoryNum }, (_, num) => (
                <option key={num} value={num + 1}>{num + 1}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    ))}
    </div>
  );
}
