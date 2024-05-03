import React, { FC, useState } from 'react';

import styles from './styles.module.css';
import { ProductType } from '@/interfaces/product';
import { useProducts } from './useProducts'
import { CommonButton } from '../../atoms/CommonButton'
import { RankPriceGrid } from '@/components/molecules/RankPriceGrid'
import { useAuthContext } from '@/contexts/AuthContext';
import { useCartContext } from '@/contexts/CartContex';
import { CartObject } from '../../../interfaces/cart';

type Props = {
  showProductList: Array<ProductType>
}

export const Products: FC<Props> = ({ showProductList }) => {

  const { user } = useAuthContext();

  const [{ existingCartItems }, { handleMoveDetailPage }] = useProducts(user?.user_id);

  const { addToCart } = useCartContext();

  const [selected, setSelected] = useState<CartObject[]>([]);

  return (
    <section className={styles.products}>
      {showProductList.map((products) => (
        <div key={products.productId} className={styles.product}>
          <div onClick={() => handleMoveDetailPage(products.productId)}>
            <img src={products.imageUrl} alt={products.title} />
            <p>{products.title}</p>
          </div>
          <RankPriceGrid
            parentProduct={products}
            gridStyle="rankPriceGrid"
            existingCartItems={existingCartItems}
            selected={selected}
            setSelected={setSelected}
          />
          <CommonButton
            buttonText="Add Cart"
            buttonStyle="addToCartButton"
            addToCart={addToCart}
            existingCartItems={existingCartItems}
            selected={selected}
            userId={user?.user_id}
          />
        </div>
      ))}
    </section>
  );
}
