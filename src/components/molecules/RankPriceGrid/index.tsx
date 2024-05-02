import React, { FC } from 'react';
import styles from './styles.module.css';
import { ProductType } from '@/interfaces/product';
import { showProduct } from '@/interfaces/product';
import { useProducts } from '../../organisms/products/useProducts'
import { CommonButton } from '../../atoms/CommonButton'

type Props = {
  parentProduct: ProductType,
  gridStyle: string
}

const defaultRanks = ['S', 'A', 'B', 'C'];

export const RankPriceGrid: FC<Props> = ({ parentProduct, gridStyle }) => {

  return (
    <div className={styles[gridStyle]}>
      {defaultRanks.map((rank) => {
        const unit = parentProduct.inventories?.find(u => u.rank === rank);
        return (
          <div key={rank} className={`${styles.rankPrice} ${styles[`rank${rank}`]}`}>
            <span>{rank}</span>
            <span>{unit ? `¥${unit.price}` : '-'}</span>
            <select className={styles.quantitySelect}>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
}
