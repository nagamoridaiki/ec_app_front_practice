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
import { useCart } from '@/hooks/useCart';
import { Cart, CartObject,  AddCartParams, fetchCartItem } from '@/interfaces/cart';
import { useProductContext } from '@/contexts/productContext';
import { useCartTemplate } from './useCartTemplate'


export const CartTemplate = () => {
  const { user, menuVisible, setMenuVisible, handleDocumentClick } = useAuthContext();
  const { productList } = useProductContext();
  const { existingCartItems } = useCart(user?.user_id);

  const [{ inCartProducts, removeFromCart, updateQuantity }] = useCartTemplate({ productList, existingCartItems });

  console.log("inCartProductsの中身", inCartProducts)

  return (
    <div className={styles.app} onClick={() => handleDocumentClick(menuVisible, setMenuVisible)}>
      <Header user={user} />

      <main className={styles.cart}>
        <div className={styles.cartDetails}>
          <h1>カートの中身</h1>
          {inCartProducts.map(item => (
          <div className={styles.cartItem} key={item.inventoryId}>
            <img src={item.imageUrl} alt="Product" className={styles.cartItemImage} />
            <div className={styles.cartItemDescription}>
              <div className={styles.cartItemInfo}>
                <h2 className={styles.cartItemTitle}>{item.title}</h2>
                <p className={styles.cartItemPrice}>ランク{item.rank} - {item.price}円</p>
              </div>
            </div>
            <div className={styles.cartItemActions}  key={item.inventoryId}>
              <button className={styles.cartItemRemove} onClick={() => removeFromCart(item.inventoryId)}>
                Remove <FaTrash />
              </button>
              <div className={styles.quantityControls}>
                <select defaultValue={item.inCartNum} className={styles.quantityInput} onChange={(e) => updateQuantity(item.inventoryId, parseInt(e.target.value))}>
                  {Array.from({ length: item.inventoryNum }, (_, num) => (
                    <option key={num} value={num + 1}>{num + 1}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
        </div>
        <div className={styles.cartSummary}>
          <h2>注文情報</h2>
          <div className={styles.orderItems}>
            {/* 注文アイテムのリスト */}
            {inCartProducts.map((item) => (
              <div className={styles.orderItem} key={item.inventoryId}>
                <span>{item.title} x{item.inCartNum}</span>
                <span>{item.price * item.inCartNum}円</span>
              </div>
            ))}
          </div>
          <div className={styles.orderTotal}>
            <span>Total</span>
            <span className={styles.totalPrice}>
              {inCartProducts.reduce((total, item) => total + (item.price * item.inCartNum), 0)}円
            </span>
          </div>
          <button className={styles.orderCheckout}>
            購入する
          </button>
        </div>
      </main>
      {menuVisible && <DropdownMenu />}

      <footer className={styles.footer}>
        {/* フッターの内容 */}
      </footer>
    </div>
  )
}
