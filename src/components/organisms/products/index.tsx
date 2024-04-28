import styles from './styles.module.css'
import { FC } from 'react';
import { showProduct } from '@/interfaces/product';
import { useProducts } from './useProducts'

type Props = {
  showProductUnitList: Array<showProduct>
}

export const Products: FC<Props> =
({showProductUnitList}) => {
  const [{ handleMoveDetailPage }] = useProducts();

  return (
    <section className={styles.products}>
      {showProductUnitList.map((product) => (
        <div className={styles.product} onClick={() => handleMoveDetailPage(product.productUnitId)}>
        <img src={product.imageUrl} alt={product.imageUrl} />
        <p>{product.productTitle}</p>
        <p>商品状態ランク: {product.rank}</p>
        <p>${product.price}</p>
        </div>
        ))
      }
    </section>
)
}