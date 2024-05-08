import styles from './styles.module.css';
import { useProductListTemplate } from './useProductListTemplate';
import { useProductContext } from '@/contexts/productContext';
import { useAuthContext } from '@/contexts/AuthContext';
import { Header } from '@/components/organisms/header'
import { Sidebar } from '@/components/organisms/sidebar'
import { Products } from '@/components/organisms/products';
import { DropdownMenu } from '@/components/organisms/DropdownMenu'

export const ProductListTemplate = () => {
  const { productList } = useProductContext();
  const { user, menuVisible, setMenuVisible, handleDocumentClick } = useAuthContext();

  const [{ initialProductList }] = useProductListTemplate({ productList });

  return (
    <div className={styles.App} onClick={() => handleDocumentClick(menuVisible, setMenuVisible)}>
      <Header user={user} />

      <div className={styles.content}>
        <Sidebar />
        {initialProductList?.length > 0 && <Products initialProductList={initialProductList}/>}
        {menuVisible && <DropdownMenu />}
      </div>
      <div className={styles.footer}>
        {/* フッターの内容 */}
      </div>
    </div>
  )
}
