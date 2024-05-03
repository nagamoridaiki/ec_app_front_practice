import React, { useState } from 'react';
import styles from './styles.module.css';
import { useProductDetailTemplate } from './useProductDetailTemplate'
import { Header } from '@/components/organisms/header'
import { useAuthContext } from '@/contexts/AuthContext';
import { DropdownMenu } from '@/components/organisms/DropdownMenu'
import { RankPriceGrid } from '@/components/molecules/RankPriceGrid'
import { CommonButton } from '../../atoms/CommonButton'
import { Cart, CartObject,  AddCartParams, fetchCartItem } from '../../../interfaces/cart';

export const ProductDetailTemplate = () => {


  const { isAuth, user, menuVisible, setMenuVisible, handleDocumentClick } = useAuthContext();

  const [{product, prevCart}, { addToCart }] = useProductDetailTemplate(user?.user_id)

  const [selectedUnit, setSelectedUnit] = useState<CartObject[]>([]);

  // console.log("showCartItems(すでにカートにある中身)", showCartItems)
  console.log("selectedUnitの中身", selectedUnit)


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
                prevCart={prevCart}
                selectedUnit={selectedUnit}
                userId={user?.user_id}
              />
            </div>
            <RankPriceGrid
              parentProduct={product}
              gridStyle="rankPriceGridDetail"
              selectedUnit={selectedUnit}
              setSelectedUnit={setSelectedUnit}

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

