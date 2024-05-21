import styles from './styles.module.css';
import { useAuthContext } from '@/contexts/AuthContext';
import { Header } from '../../organisms/Header'
import { DropdownMenu } from '@/components/organisms/DropdownMenu'
import { CartItems } from '@/components/organisms/CartItems'
import { TotalAmount } from '@/components/organisms/TotalAmount'
import { useCart } from '@/hooks/useCart';
import { useProductContext } from '@/contexts/productContext';
import { useCartTemplate } from './useCartTemplate'

export const CartTemplate = () => {
  const { user, menuVisible, setMenuVisible, handleDocumentClick } = useAuthContext();
  const { productList } = useProductContext();
  const { existingCartItems } = useCart(user?.user_id);

  const [{ inCartProducts, removeFromCart, updateQuantity }] = useCartTemplate({ productList, existingCartItems });

  return (
    <div className={styles.app} onClick={() => handleDocumentClick(menuVisible, setMenuVisible)}>
      <Header user={user} />
      <main className={styles.cart}>
        <CartItems inCartProducts={inCartProducts} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
        <TotalAmount inCartProducts={inCartProducts} />
      </main>
      {menuVisible && <DropdownMenu />}
      <footer className={styles.footer}>
        {/* フッターの内容 */}
      </footer>
    </div>
  )
}
