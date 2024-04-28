import styles from './styles.module.css';
import { useAuthContext } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NAVIGATION_LIST, NAVIGATION_PATH } from '@/constants/navigation';
import { Header } from '../../../components/organisms/header'
import { FaTrash } from 'react-icons/fa';
import { DropdownMenu } from '@/components/organisms/DropdownMenu'
import diningTableImage from '../../../../public/products/books/bible-1867195_1920.jpeg';
import chairImage from '../../../../public/products/books/book-1283468_1920.jpeg';

export const CartTemplate = () => {
  const { user, menuVisible, setMenuVisible, handleDocumentClick } = useAuthContext();


  return (
    <div className={styles.app} onClick={() => handleDocumentClick(menuVisible, setMenuVisible)}>
      <Header user={user} />

      <main className={styles.cart}>
        <div className={styles["cart-details"]}>
          <h1>My shopping cart</h1>
          {/* カートアイテムのリストをここに表示 */}
          {/* ダミーデータのための繰り返し */}
          <div className={styles["cart-item"]}>
            <img src={diningTableImage.src} alt="Product" className={styles["cart-item-image"]} />
            <div className={styles["cart-item-description"]}>
              <h2 className={styles["cart-item-title"]}>Dictionary</h2>
              <p className={styles["cart-item-price"]}>$ 2300</p>
              {/* 他のカートアイテム情報 */}
            </div>
            <div className={styles["cart-item-actions"]}>
              <button className={styles["cart-item-remove"]}>
                Remove <FaTrash />
              </button>
              <div className={styles["quantity-controls"]}>
                <button className={styles["quantity-decrease"]}>-</button>
                <input type="number" value="1" className={styles["quantity-input"]}/>
                <button className={styles["quantity-increase"]}>+</button>
              </div>
            </div>
          </div>

          <div className={styles["cart-item"]}>
            <img src={chairImage.src} alt="Product" className={styles["cart-item-image"]} />
            <div className={styles["cart-item-description"]}>
              <h2 className={styles["cart-item-title"]}>Chair</h2>
              <p className={styles["cart-item-price"]}>$ 33000</p>
              {/* 他のカートアイテム情報 */}
            </div>
            <div className={styles["cart-item-actions"]}>
              <button className={styles["cart-item-remove"]}>
                Remove <FaTrash />
              </button>
              <div className={styles["quantity-controls"]}>
                <button className={styles["quantity-decrease"]}>-</button>
                <input type="number" value="1" className={styles["quantity-input"]}/>
                <button className={styles["quantity-increase"]}>+</button>
              </div>
            </div>
          </div>

        </div>

        <div className={styles["cart-summary"]}>
          <h2>My order</h2>
          <div className={styles["order-items"]}>
            {/* 注文アイテムのリスト */}
            <div className={styles["order-item"]}>
              <span>1x Item Name</span>
              <span>$Price</span>
            </div>
            {/* 他の注文アイテム */}
          </div>
          <div className={styles["promo-code-container"]}>
            <input type="text" placeholder="Enter promo code" className={styles["promo-code-input"]} />
            <button className={styles["promo-code-apply"]}>Apply</button>
          </div>
          <div className={styles["order-total"]}>
            <span>Total</span>
            <span className={styles["total-price"]}>$Total</span>
          </div>
          <button className={styles["order-checkout"]}>Buy now $Total</button>
        </div>
      </main>
      {menuVisible && <DropdownMenu />}

      <footer className={styles.footer}>
        {/* フッターの内容 */}
      </footer>
    </div>
  )
}
