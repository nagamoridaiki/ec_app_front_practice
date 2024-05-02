import React from 'react';
import styles from './styles.module.css';
import { useProductListTemplate } from './useProductDetailTemplate'
import { Header } from '@/components/organisms/header'
import { useAuthContext } from '@/contexts/AuthContext';
import { DropdownMenu } from '@/components/organisms/DropdownMenu'
import { RankPriceGrid } from '@/components/molecules/RankPriceGrid'
import { CommonButton } from '../../atoms/CommonButton'

export const ProductDetailTemplate = () => {

  const [{product}] = useProductListTemplate()

  const { isAuth, user, menuVisible, setMenuVisible, handleDocumentClick } = useAuthContext();

  return (
    <div className={styles.app} onClick={() => handleDocumentClick(menuVisible, setMenuVisible)}>
      <Header user={user} />

        {!!product && (
        <main className={styles.productDetails}>
          <section className={styles.productGallery}>
            <img src={product.imageUrl} alt={product.title} />
          </section>
          <section className={styles.productInfo}>
            <h1>{product.title}</h1>
            <p className={styles.description}>{product.note}</p>
            <RankPriceGrid parentProduct={product} gridStyle="rankPriceGridDetail" />
            <CommonButton buttonText="Add Cart" buttonStyle="addToCartButtonDetail" />
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
