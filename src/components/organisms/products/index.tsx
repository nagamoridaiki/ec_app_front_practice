import './Products.css'
import { FC } from 'react';
import { ProductType } from '../../../interfaces/product';

type Props = {
  showProductList: Array<ProductType>
}

export const Products: FC<Props> =
({showProductList}) => {
  return (
    <section className="products">
      {showProductList.map((product) => (
        <div className="product">
        <img src={product.imageUrl} alt={product.imageUrl} />
        <p>{product.title}</p>
        <p>${product.price}</p>
        </div>
        ))
      }
    </section>
)
}