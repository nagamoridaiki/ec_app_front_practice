import styles from './styles.module.css'
import { FaHome, FaShoppingCart, FaUserCircle } from 'react-icons/fa';

const cartTotal = 2580; // // この値はカートの内容に基づいて動的に変更される予定

export const Header = () => {
  return (
      <header className={styles.mainHeader}>
        <div className={styles.logoContainer}>
          <a href="/" className={styles.homeLink}>
            <FaHome />
          </a>
        </div>
        <div className={styles.searchContainer}>
          <button className={styles.searchBtn}>Q</button>
          <input type="text" className={styles.searchInput} placeholder="Search for item" />
        </div>

        <div className={styles.cartInfo}>
          <span className={styles.cartTotal}>¥{cartTotal}</span>
          <a href="/cart" className={styles.cartLink}>
            <FaShoppingCart />
          </a>
        </div>

        <nav className={styles.mainNav}>
          <ul>
            <li><a href="/news">News</a></li>
            <li><a href="/mypage">MyPage</a></li>
            <li><a href="/user"><FaUserCircle /></a></li>
          </ul>
        </nav>
      </header>
  )
}