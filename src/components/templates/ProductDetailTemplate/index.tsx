import React from 'react';
import styles from './styles.module.css';
import { useProductListTemplate } from './useProductDetailTemplate'
import { Header } from '@/components/organisms/header'
import { useAuthContext } from '@/contexts/AuthContext';
import { DropdownMenu } from '@/components/organisms/DropdownMenu'

export const ProductDetailTemplate = () => {

  const [{product}] = useProductListTemplate()

  const { isAuth, user, menuVisible, setMenuVisible, handleDocumentClick } = useAuthContext();

  return (
    <div className={styles.app} onClick={() => handleDocumentClick(menuVisible, setMenuVisible)}>
      <Header user={user} />

        {!!product && (
        <main className={styles.productDetails}>
          <section className={styles.productGallery}>
            <img src={product.imageUrl} alt={product.productTitle} />
          </section>
          <section className={styles.productInfo}>
            <h1>{product.productTitle}</h1>
            {product.productUnit?.map((unit, index) => (
              <React.Fragment key={index}>
                <p className={styles.price}>商品状態: ランク{unit.rank}</p>
                <p className={styles.price}>{unit.price}円</p>
              </React.Fragment>
            ))}
            <p className={styles.description}>{product.productDescription}</p>
            {/* その他の情報やアクションボタンなど */}
            <button className={styles.addToCart}>Add to Cart</button>
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
