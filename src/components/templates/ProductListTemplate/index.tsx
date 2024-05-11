import styles from './styles.module.css';
import { useProductListTemplate } from './useProductListTemplate';
import { useProductContext } from '@/contexts/productContext';
import { useAuthContext } from '@/contexts/AuthContext';
import { Header } from '@/components/organisms/Header'
import { Sidebar } from '@/components/organisms/Sidebar'
import { Products } from '@/components/organisms/Products';
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
