import React, { useState } from 'react';
import styles from './styles.module.css';
import { useProductDetailTemplate } from './useProductDetailTemplate'
import { Header } from '@/components/organisms/header'
import { useAuthContext } from '@/contexts/AuthContext';
import { DropdownMenu } from '@/components/organisms/DropdownMenu'
import { RankPriceGrid } from '@/components/molecules/RankPriceGrid'
import { CommonButton } from '../../atoms/CommonButton'
import { CartObject } from '../../../interfaces/cart';
import { useCart } from '@/hooks/useCart';

export const ProductDetailTemplate = () => {

  const { user, menuVisible, setMenuVisible, handleDocumentClick } = useAuthContext();

  const [{ product }] = useProductDetailTemplate(user?.user_id)

  const { existingCartItems, addToCart } = useCart(user?.user_id);

  const [selected, setSelected] = useState<CartObject[]>([]);

  const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);

  const handleAddToCart = async (selected: CartObject[]) => {
    if (user?.user_id) {
      await addToCart(existingCartItems, selected, user.user_id);
      setShowAddToCartMessage(true);
      setTimeout(() => setShowAddToCartMessage(false), 2500);
    }
  };

  return (
    <div className={styles.app} onClick={() => handleDocumentClick(menuVisible, setMenuVisible)}>
      <Header user={user} />

      {showAddToCartMessage && (
        <div className={styles.addToCartPopup}>カートに追加しました</div>
      )}

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
                addToCart={() => handleAddToCart(selected)}
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

