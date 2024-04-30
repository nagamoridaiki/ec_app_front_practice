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
        <div key={parent_product.productId} className={styles.product} onClick={() => handleMoveDetailPage(parent_product.productId)}>
          <img src={parent_product.imageUrl} alt={parent_product.productTitle} />
          <p>{parent_product.productTitle}</p>
          <div className={styles.rankPriceContainer}>
            {defaultRanks.map((rank) => {
              const unit = parent_product.productUnit?.find(u => u.rank === rank);
              return (
                <div key={rank} className={`${styles.rankPrice} ${styles[`rank${rank}`]}`}>
                  <span>{rank}</span>
                  <span>{unit ? `¥${unit.price}` : '-'}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
