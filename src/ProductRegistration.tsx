import React from 'react';
import './ProductRegistration.css'; // 新しいCSSファイルへのパスを指定
import './MainPage.css'; // ヘッダーの部分のみ既存のCSSを再利用
import diningTableImage from './products/books/bible-1867195_1920.jpeg';
import chairImage from './products/books/book-1283468_1920.jpeg';
import { FaHome, FaShoppingCart, FaUserCircle } from 'react-icons/fa';

const cartTotal = 2580; // // この値はカートの内容に基づいて動的に変更される予定

function ProductRegistration() {
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

      <div className="product-registration-container">
        <h1>Product Registration</h1>
        <form className="product-registration-form">
          <div className="form-group">
            <label htmlFor="productName">Product Name:</label>
            <input type="text" id="productName" name="productName" required />
          </div>

          <div className="form-group">
            <label htmlFor="productImage">Product Image:</label>
            <input type="file" id="productImage" name="productImage" accept="image/*" required />
          </div>

          <div className="form-group">
            <label htmlFor="productPrice">Price:</label>
            <input type="number" id="productPrice" name="productPrice" step="0.01" required />
          </div>

          <button type="submit" className="submit-button">Register Product</button>
        </form>
      </div>

      {/* フッターを含む他のコンポーネントは省略 */}
    </div>
  );
}

export default ProductRegistration;
