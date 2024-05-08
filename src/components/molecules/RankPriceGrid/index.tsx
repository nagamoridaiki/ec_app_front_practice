import React, { FC, useState, useEffect } from 'react';
import styles from './styles.module.css';
import { ProductType } from '@/interfaces/product';
import { useProducts } from '../../organisms/products/useProducts'
import { Cart, CartObject,  AddCartParams, fetchCartItem } from '../../../interfaces/cart';
import { EventType } from '@/interfaces/event';

type Props = {
  parentProduct: ProductType,
  gridStyle: string,
  selected: CartObject[],
  setSelected: React.Dispatch<React.SetStateAction<CartObject[]>>
  existingCartItems?: CartObject[]
}

const defaultRanks = ['S', 'A', 'B', 'C'];

export const RankPriceGrid: FC<Props> = ({ parentProduct, gridStyle, selected, setSelected, existingCartItems }) => {

  const [hand, setHand] = useState<number>(0);

  useEffect(() => {
    if (selected) {
      setSelected
    }
  }, []);

  return (
    <div className={styles[gridStyle]}>
      {defaultRanks.map((rank) => {
        const unit = parentProduct.inventories?.find(u => u.rank === rank);
        return (
          <div key={rank} className={`${styles.rankPrice} ${styles[`rank${rank}`]}`}>
            <span>{rank}</span>
            <span>{unit ? `¥${unit.price}` + ' ' + `(残${unit.inventoryNum})` : `在庫0`}</span>
            <select
              className={styles.quantitySelect}
              value={existingCartItems?.find(item => item.inventoryId === unit?.inventoryId)?.addToCartCount || 0}
              onChange={(e) => {
                setHand(Number(e.target.value));
                if (unit) {
                  setSelected(prevUnits => [
                    ...prevUnits.filter(item => item.inventoryId !== unit.inventoryId),
                    {
                      inventoryId: unit.inventoryId,
                      addToCartCount: Number(e.target.value)
                    }
                  ]);
                }
              }}
            >
              {Array.from({ length: (unit ? unit.inventoryNum : 0) + 1 }, (_, i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
}
