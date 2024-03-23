


import React from 'react';
import './MainPage.css';
import diningTableImage from './products/books/bible-1867195_1920.jpeg';
import chairImage from './products/books/book-1283468_1920.jpeg';
import lampImage from './products/books/book-3510326_1920.jpeg';
import sofaImage from './products/books/paper-3061485_1920.jpeg';
import bookshelfImage from './products/books/rashtravardhan-kataria.jpeg';
import deskImage from './products/books/tea-time-3240766_1920.jpeg';
import bedImage from './products/clothes/black-shirts.jpeg';
import wardrobeImage from './products/clothes/blank-1886001_1920.png';
import coffeeTableImage from './products/clothes/blank-1886008_1920.png';
import armchairImage from './products/clothes/fashion-1283863_1920.jpeg';
import stoolImage from './products/clothes/man-407095_1920.jpeg';
import floorLampImage from './products/clothes/shirt-2878932_1920.jpeg';
import { FaHome, FaShoppingCart, FaRegNewspaper, FaUserCircle } from 'react-icons/fa';

const cartTotal = 2580; // // この値はカートの内容に基づいて動的に変更される予定

function MainPage() {
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

      <div className="content">
        <aside className="filters">
        <div className="filter-section">
            <h3>Availability</h3>
            <label className="checkbox-custom">Purchase now
              <input type="checkbox" checked />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-custom">Ending soon
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <label>
              Min:
              <input type="number" placeholder="Min price" className="price-input" />
            </label>
            <label>
              Max:
              <input type="number" placeholder="Max price" className="price-input" />
            </label>
          </div>

          <div className="filter-section">
            <h3>Condition</h3>
            <label className="checkbox-custom">S (New)
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-custom">A (Like New)
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-custom">B (Good)
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-custom">C (Fair)
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </div>

          <div className="filter-section">
            <h3>Product Name</h3>
            <input type="text" className="product-name-input" placeholder="Enter product name" />
          </div>

        </aside>

        <section className="products">
          {/* 各商品情報を繰り返し表示 */}
          <div className="product">
            <img src={diningTableImage} alt="Dining table" />
            <p>Dining table</p>
            <p>$150.00</p>
            {/* その他の詳細 */}
          </div>
          <div className="product">
            <img src={chairImage} alt="Comfortable chair" />
            <p>Comfortable chair</p>
            <p>$75.00</p>
            {/* その他の詳細 */}
          </div>
          <div className="product">
            <img src={lampImage} alt="Modern lamp" />
            <p>Modern lamp</p>
            <p>$45.00</p>
            {/* その他の詳細 */}
          </div>
          <div className="product">
            <img src={sofaImage} alt="Cozy sofa" />
            <p>Cozy sofa</p>
            <p>$300.00</p>
            {/* その他の詳細 */}
          </div>
          <div className="product">
            <img src={bookshelfImage} alt="Spacious bookshelf" />
            <p>Spacious bookshelf</p>
            <p>$120.00</p>
            {/* その他の詳細 */}
          </div>
          <div className="product">
            <img src={deskImage} alt="Office desk" />
            <p>Office desk</p>
            <p>$200.00</p>
            {/* その他の詳細 */}
          </div>
          <div className="product">
            <img src={bedImage} alt="Comfortable bed" />
            <p>Comfortable bed</p>
            <p>$400.00</p>
            {/* その他の詳細 */}
          </div>
          <div className="product">
            <img src={wardrobeImage} alt="Spacious wardrobe" />
            <p>Spacious wardrobe</p>
            <p>$250.00</p>
            {/* その他の詳細 */}
          </div>
          <div className="product">
            <img src={coffeeTableImage} alt="Modern coffee table" />
            <p>Modern coffee table</p>
            <p>$85.00</p>
            {/* その他の詳細 */}
          </div>
          <div className="product">
            <img src={armchairImage} alt="Stylish armchair" />
            <p>Stylish armchair</p>
            <p>$125.00</p>
            {/* その他の詳細 */}
          </div>
          <div className="product">
            <img src={stoolImage} alt="Ergonomic stool" />
            <p>Ergonomic stool</p>
            <p>$50.00</p>
            {/* その他の詳細 */}
          </div>
          <div className="product">
            <img src={floorLampImage} alt="Elegant floor lamp" />
            <p>Elegant floor lamp</p>
            <p>$70.00</p>
            {/* その他の詳細 */}
          </div>
          {/* 他の商品コンポーネント */}
        </section>
      </div>
      <div className="footer">
        {/* フッターの内容 */}
      </div>
    </div>
  );
}

export default MainPage;
