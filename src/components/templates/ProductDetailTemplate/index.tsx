import styles from './styles.module.css';
import { useProductListTemplate } from './useProductDetailTemplate'
import { Header } from '../../../components/organisms/header'

export const ProductDetailTemplate = () => {

  const [{product}] = useProductListTemplate()

  return (
    <div className={styles.app}>
      <Header />

        {!!product && (
        <main className={styles.productDetails}>
          <section className={styles.productGallery}>
            <img src={product.imageUrl} alt={product.title} />
          </section>
          <section className={styles.productInfo}>
            <h1>{product.title}</h1>
            <p className={styles.price}>{product.price}</p>
            <p className={styles.description}>{product.description}</p>
            {/* その他の情報やアクションボタンなど */}
            <button className={styles.addToCart}>Add to Cart</button>
          </section>
        </main>
      )}

      <footer className={styles.footer}>
        {/* フッターの内容 */}
      </footer>
    </div>
  )
}
