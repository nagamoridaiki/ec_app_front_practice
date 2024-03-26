import './Header.css'
import { FaHome, FaShoppingCart, FaRegNewspaper, FaUserCircle } from 'react-icons/fa';


const cartTotal = 2580; // // この値はカートの内容に基づいて動的に変更される予定

export const Header = () => {
  return (
    <div>
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
    </div>
  )
}