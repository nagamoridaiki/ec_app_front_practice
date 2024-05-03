import React, { useState } from 'react';
import styles from './styles.module.css';
import { useProductDetailTemplate } from './useProductDetailTemplate'
import { Header } from '@/components/organisms/header'
import { useAuthContext } from '@/contexts/AuthContext';
import { useCartContext } from '@/contexts/CartContex';
import { DropdownMenu } from '@/components/organisms/DropdownMenu'
import { RankPriceGrid } from '@/components/molecules/RankPriceGrid'
import { CommonButton } from '../../atoms/CommonButton'
import { Cart, CartObject,  AddCartParams, fetchCartItem } from '../../../interfaces/cart';

export const ProductDetailTemplate = () => {

  const { isAuth, user, menuVisible, setMenuVisible, handleDocumentClick } = useAuthContext();
  const { addToCart } = useCartContext();

  const [{ product, existingCartItems }] = useProductDetailTemplate(user?.user_id)

  const [selected, setSelected] = useState<CartObject[]>([]);

  return (
    <div className={styles.app} onClick={() => handleDocumentClick(menuVisible, setMenuVisible)}>
      <Header user={user} />

      {!!product && (
        <main className={styles.productDetails}>
          <section className={styles.productGallery}>

            <img src={product.imageUrl} alt={product.title} />
          </section>

          <section className={styles.productInfo}>
            <div className={styles.productText}>
              <h1>{product.title}</h1>
              <p className={styles.description}>{product.note}</p>
              <CommonButton
                buttonText="Add Cart"
                buttonStyle="addToCartButtonDetail"
                addToCart={addToCart}
                existingCartItems={existingCartItems}
                selected={selected}
                userId={user?.user_id}
              />
            </div>
            <RankPriceGrid
              parentProduct={product}
              gridStyle="rankPriceGridDetail"
              existingCartItems={existingCartItems}
              selected={selected}
              setSelected={setSelected}
            />
          </section>
        </main>
      )}
      {menuVisible && <DropdownMenu />}

      <footer className={styles.footer}>
        {/* フッターの内容 */}
      </footer>
    </div>
  )
}

