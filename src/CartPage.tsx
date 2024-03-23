import React from 'react';
import './CartPage.css'; // 新しいCSSファイルへのパスを指定
import './MainPage.css'; // ヘッダーの部分のみ既存のCSSを再利用
import diningTableImage from './products/books/bible-1867195_1920.jpeg';
import chairImage from './products/books/book-1283468_1920.jpeg';
import { FaHome, FaShoppingCart, FaRegNewspaper, FaUserCircle, FaTrash } from 'react-icons/fa';

const cartTotal = 2580; // // この値はカートの内容に基づいて動的に変更される予定

function CartPage() {
  // カートアイテムの状態やロジックをここに実装

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

      <main className="cart">
        <div className="cart-details">
          <h1>My shopping cart</h1>
          {/* カートアイテムのリストをここに表示 */}
          {/* ダミーデータのための繰り返し */}
          <div className="cart-item">
            <img src={diningTableImage} alt="Product" className="cart-item-image" />
            <div className="cart-item-description">
              <h2 className="cart-item-title">Dictionary</h2>
              <p className="cart-item-price">$ 2300</p>
              {/* 他のカートアイテム情報 */}
            </div>
            <div className="cart-item-actions">
              <button className="cart-item-remove">
                Remove <FaTrash />
              </button>
              <div className="quantity-controls">
                <button className="quantity-decrease">-</button>
                <input type="number" value="1" className="quantity-input"/>
                <button className="quantity-increase">+</button>
              </div>
            </div>
          </div>

          <div className="cart-item">
            <img src={chairImage} alt="Product" className="cart-item-image" />
            <div className="cart-item-description">
              <h2 className="cart-item-title">Chair</h2>
              <p className="cart-item-price">$ 33000</p>
              {/* 他のカートアイテム情報 */}
            </div>
            <div className="cart-item-actions">
              <button className="cart-item-remove">
                Remove <FaTrash />
              </button>
              <div className="quantity-controls">
                <button className="quantity-decrease">-</button>
                <input type="number" value="1" className="quantity-input"/>
                <button className="quantity-increase">+</button>
              </div>
            </div>
          </div>

        </div>

        <div className="cart-summary">
          <h2>My order</h2>
          <div className="order-items">
            {/* 注文アイテムのリスト */}
            <div className="order-item">
              <span>1x Item Name</span>
              <span>$Price</span>
            </div>
            {/* 他の注文アイテム */}
          </div>
          <div className="promo-code-container">
            <input type="text" placeholder="Enter promo code" className="promo-code-input" />
            <button className="promo-code-apply">Apply</button>
          </div>
          <div className="order-total">
            <span>Total</span>
            <span className="total-price">$Total</span>
          </div>
          <button className="order-checkout">Buy now $Total</button>
        </div>
      </main>

      {/* フッターを含む他のコンポーネントは省略 */}
    </div>
  );
}

export default CartPage;
