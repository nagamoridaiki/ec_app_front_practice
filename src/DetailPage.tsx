import React from 'react';
import './MainPage.css'; // ヘッダーの部分のみ既存のCSSを再利用
import './DetailPage.css'; // 既存のCSSを再利用
import diningTableImage from './products/books/bible-1867195_1920.jpeg';
import { FaHome, FaShoppingCart, FaRegNewspaper, FaUserCircle } from 'react-icons/fa';

const cartTotal = 2580; // // この値はカートの内容に基づいて動的に変更される予定

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
      <header className="main-header">
        <div className="logo-container">
          <a href="/" className="home-link">
            <FaHome />
          </a>
        </div>
        <div className="search-container">
          <button className="search-btn">Q</button>
          <input type="text" className="search-input" placeholder="Search for item" />
        </div>

        <div className="cart-info">
          <span className="cart-total">¥{cartTotal}</span>
          <a href="/cart" className="cart-link">
            <FaShoppingCart />
          </a>
        </div>

        <nav className="main-nav">
          <ul>
            <li><a href="/news">News</a></li>
            <li><a href="/mypage">MyPage</a></li>
            <li><a href="/user"><FaUserCircle /></a></li>
          </ul>
        </nav>
      </header>

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
