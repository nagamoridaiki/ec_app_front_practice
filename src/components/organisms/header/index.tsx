import { FC, useState } from 'react';
import styles from './styles.module.css'
import { FaHome, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { UserType } from '@/interfaces/userType';
import { useAuthContext } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';

type Props = {
  user: UserType | undefined
}

export const Header: FC<Props> = ({user}) => {
  const { setMenuVisible, menuVisible } = useAuthContext();

  const { existingCartItems } = useCart(user?.user_id);

  const calculateTotalAmount = () => {
    return existingCartItems.reduce((total, item) => total + (item.price * item.addToCartCount), 0);
  };

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
          <span className={styles.cartTotal}>¥{calculateTotalAmount()}</span>
          <a href="/ec/cart" className={styles.cartLink}>
            <FaShoppingCart />
          </a>
        </div>

        <nav className={styles.mainNav}>
            {user ? (
              <ul onClick={() => setMenuVisible(!menuVisible)}>
                <li>{user.name}</li>
                <li><FaUserCircle /></li>
              </ul>
            ) : (
              <a href="/login"><span>Login</span></a>
            )}
        </nav>
      </header>
  )
}