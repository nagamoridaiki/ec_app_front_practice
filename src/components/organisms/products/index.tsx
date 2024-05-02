import React, { FC } from 'react';
import styles from './styles.module.css';
import { ProductType } from '@/interfaces/product';
import { showProduct } from '@/interfaces/product';
import { useProducts } from './useProducts'
import { CommonButton } from '../../atoms/CommonButton'
import { RankPriceGrid } from '@/components/molecules/RankPriceGrid'

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
            <img src={parent_product.imageUrl} alt={parent_product.title} />
            <p>{parent_product.title}</p>
          </div>
          <RankPriceGrid parentProduct={parent_product} gridStyle="rankPriceGrid" />
          <CommonButton buttonText="Add Cart" buttonStyle="addToCartButton" />
        </div>
      ))}
    </section>
  );
}
