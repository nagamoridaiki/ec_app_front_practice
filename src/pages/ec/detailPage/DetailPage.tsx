import React from 'react';
import './DetailPage.css'; // 既存のCSSを再利用
import diningTableImage from '../../../products/books/bible-1867195_1920.jpeg';
import { Header } from '../../../components/organisms/header'

// 仮想の商品データ
const product = {
  name: "Comfortable Armchair",
  price: "$250.00",
  description: "この快適なアームチェアは、どんな部屋にもぴったりのアクセントを加えます。耐久性があり、長時間座っていても快適な座り心地を提供します。シンプルで洗練されたデザインが、お部屋の雰囲気を一層引き立てます。",
  imageUrl: `${diningTableImage}` // 実際の画像パスを設定してください
};

function DetailPage() {
  return (
    <div className="App">
      <Header />

      <main className="product-details">
        <section className="product-gallery">
          <img src={product.imageUrl} alt={product.name} />
        </section>
        <section className="product-info">
          <h1>{product.name}</h1>
          <p className="price">{product.price}</p>
          <p className="description">{product.description}</p>
          {/* その他の情報やアクションボタンなど */}
          <button className="add-to-cart">Add to Cart</button>
        </section>
      </main>

      <footer className="footer">
        {/* フッターの内容 */}
      </footer>
    </div>
  );
}

export default DetailPage;
