import './Products.css'
import { FC } from 'react';
import { ProductType } from '../../../interfaces/product';
import { useProducts } from './useProducts'

type Props = {
  showProductList: Array<ProductType>
}

export const Products: FC<Props> =
({showProductList}) => {
  const [{ handleMoveDetailPage }] = useProducts();

  return (
    <section className="products">
      {showProductList.map((product) => (
        <div className="product" onClick={() => handleMoveDetailPage(product.id)}>
        <img src={product.imageUrl} alt={product.imageUrl} />
        <p>{product.title}</p>
        <p>${product.price}</p>
        </div>
        ))
      }
    </section>
)
}