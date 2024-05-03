import React, { FC, useState, useEffect } from 'react';
import styles from './styles.module.css';
import { ProductType } from '@/interfaces/product';
import { useProducts } from '../../organisms/products/useProducts'
import { Cart, CartObject,  AddCartParams, fetchCartItem } from '../../../interfaces/cart';
import { EventType } from '@/interfaces/event';

type Props = {
  parentProduct: ProductType,
  gridStyle: string,
  selectedUnit: CartObject[],
  setSelectedUnit: React.Dispatch<React.SetStateAction<CartObject[]>>
  prevCart?: Array<CartObject>
}

const defaultRanks = ['S', 'A', 'B', 'C'];

export const RankPriceGrid: FC<Props> = ({ parentProduct, gridStyle, selectedUnit, setSelectedUnit, prevCart }) => {

  const [hand, setHand] = useState<number>(0);

  useEffect(() => {
    if (selectedUnit) {
      setSelectedUnit
    }
  }, []);

  console.log("selectedUnitの中身", selectedUnit)

  return (
    <div className={styles[gridStyle]}>
      {defaultRanks.map((rank) => {
        const unit = parentProduct.inventories?.find(u => u.rank === rank);
        return (
          <div key={rank} className={`${styles.rankPrice} ${styles[`rank${rank}`]}`}>
            <span>{rank}</span>
            <span>{unit ? `¥${unit.price}` + ' ' + `(残${unit.inventoryNum})` : `在庫0`}</span>
            <select className={styles.quantitySelect} onChange={(e) => {
              setHand(Number(e.target.value));
              if (unit) {
                setSelectedUnit(prevUnits => [
                  ...prevUnits,
                  {
                    inventoryUnitId: unit.inventoryId,
                    addToCartCount: Number(e.target.value)
                  }
                ]);
              }
            }}>
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
