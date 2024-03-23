import React from 'react';
import './MainPage.css'; // ヘッダーの部分のみ既存のCSSを再利用
import './MyPage.css'; // 既存のCSSを再利用
import diningTableImage from './products/books/bible-1867195_1920.jpeg';
import { FaHome, FaShoppingCart, FaRegNewspaper, FaUserCircle } from 'react-icons/fa';

const cartTotal = 2580; // // この値はカートの内容に基づいて動的に変更される予定

function MyPage() {
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

      <main className="signin-container">
        <h1>My Page</h1>
        <div className="user-data-display">
          <p>Name: John Doe</p>
          <p>Email: john.doe@example.com</p>
          <p>Password: ********</p>
        </div>
        <div style={{ margin: '20px 0' }}><hr className="user-data-divider" /></div>
        <form className="signin-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="New name" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="New email" />
          </div>

          <div className="form-group password-update-section">
            <label htmlFor="password">New Password:</label>
            <input type="password" id="password" name="password" placeholder="New password" />
            <label htmlFor="password-confirm">Confirm:</label>
            <input type="password" id="password-confirm" name="password-confirm" placeholder="Confirm new password" />
          </div>
          <button type="submit" className="signin-button">Update</button>
        </form>
      </main>

      <footer className="footer">
        {/* フッターの内容 */}
      </footer>
    </div>
  );
}

export default MyPage;
