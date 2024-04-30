import React, { FC } from 'react';
import styles from './styles.module.css';
import { ProductType } from '@/interfaces/product';
import { showProduct } from '@/interfaces/product';
import { useProducts } from './useProducts'

type Props = {
  showProductUnitList: Array<ProductType>
}

const defaultRanks = ['S', 'A', 'B', 'C'];

export const Products: FC<Props> = ({ showProductUnitList }) => {
  const [{ handleMoveDetailPage }] = useProducts();
  return (
    <section className={styles.products}>
      {showProductUnitList.map((parent_product) => (
        <div key={parent_product.productId} className={styles.product}>
          <div onClick={() => handleMoveDetailPage(parent_product.productId)}>
            <img src={parent_product.imageUrl} alt={parent_product.productTitle} />
            <p>{parent_product.productTitle}</p>
          </div>
          <div className={styles.rankPriceGrid}>
            {defaultRanks.map((rank) => {
              const unit = parent_product.productUnit?.find(u => u.rank === rank);
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
          <button className={styles.addToCartButton}>カートに入れる</button>
        </div>
      ))}
    </section>
  );
}
