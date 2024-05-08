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

  const [selectedCounts, setSelectedCounts] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const initialCounts = existingCartItems?.reduce((acc, item) => {
      acc[item.inventoryId] = item.addToCartCount;
      return acc;
    }, {} as { [key: number]: number });
    setSelectedCounts(initialCounts || {});
  }, [existingCartItems]);

  return (
    <div className={styles[gridStyle]}>
      {defaultRanks.map((rank) => {
        const unit = parentProduct.inventories?.find(u => u.rank === rank);
        return (
          <div key={rank} className={`${styles.rankPrice} ${styles[`rank${rank}`]}`}>
            <span>{rank}</span>
            <span>{unit ? `¥${unit.price}` + ' ' + `(残${unit.inventoryNum})` : `在庫0`}</span>
            {unit && (
              <select
                className={styles.quantitySelect}
                value={selectedCounts[unit.inventoryId] || 0}
                onChange={(e) => {
                  const newCount = Number(e.target.value);
                  setSelectedCounts(prev => ({ ...prev, [unit.inventoryId]: newCount }));
                  setSelected(prevUnits => [
                    ...prevUnits.filter(item => item.inventoryId !== unit.inventoryId),
                    {
                      inventoryId: unit.inventoryId,
                      addToCartCount: newCount
                    }
                  ]);
                }}
              >
                {Array.from({ length: (unit.inventoryNum || 0) + 1 }, (_, i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            )}
          </div>
        );
      })}
    </div>
  );
}

