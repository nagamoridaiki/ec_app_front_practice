import styles from './styles.module.css'
import { FC } from 'react';
import { ProductType, showProductList } from '../../../interfaces/product';
import { useProducts } from './useProducts'

type Props = {
  showProductUnitList: Array<showProductList>
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
        <p>${product.price}</p>
        </div>
        ))
      }
    </section>
)
}