import './ProductDetailTemplate.css'
import { useProductListTemplate } from './useProductDetailTemplate'
import { Header } from '../../../components/organisms/header'



export const ProductDetailTemplate = () => {

  const [{product}] = useProductListTemplate()
  console.log("productの中身", product)


  return (
    <div className="App">
      <Header />

        {!!product && (
        <main className="product-details">
          <section className="product-gallery">
            <img src={product.imageUrl} alt={product.title} />
          </section>
          <section className="product-info">
            <h1>{product.title}</h1>
            <p className="price">{product.price}</p>
            <p className="description">{product.description}</p>
            {/* その他の情報やアクションボタンなど */}
            <button className="add-to-cart">Add to Cart</button>
          </section>
        </main>
      )}

      <footer className="footer">
        {/* フッターの内容 */}
      </footer>
    </div>
  )
}
