import React, { FC } from 'react';
import styles from './styles.module.css';
import { MergedProductType } from '@/interfaces/product';
import { CommonButton } from '@/components/atoms/CommonButton'

type Props = {
  inCartProducts: MergedProductType[]
}

export const TotalAmount: FC<Props> = ({ inCartProducts }) => {

  return (
    <div className={styles.cartSummary}>
      <h2>注文情報</h2>
      <div className={styles.orderItems}>
        {/* カートに入れたリスト */}
        {inCartProducts.map((item) => (
          <div className={styles.orderItem} key={item.inventoryId}>
            <span>{item.title} x{item.inCartNum}</span>
            <span>{item.price * item.inCartNum}円</span>
          </div>
        ))}
      </div>
      <div className={styles.orderTotal}>
        <span>Total</span>
        <span className={styles.totalPrice}>
          {inCartProducts.reduce((total, item) => total + (item.price * item.inCartNum), 0)}円
        </span>
      </div>
      <CommonButton
        buttonText="購入に進む"
        buttonStyle="orderCheckout"
      />
    </div>
  );
}
