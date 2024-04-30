import styles from './styles.module.css';
import { useProductListTemplate } from './useProductListTemplate';
import { useEffect, useRef } from 'react'
import { useProductContext } from '@/contexts/productContext';
import { useAuthContext } from '@/contexts/AuthContext';
import { Header } from '@/components/organisms/header'
import { Sidebar } from '@/components/organisms/sidebar'
import { Products } from '@/components/organisms/products';
import { UserType } from '@/interfaces/userType';
import { DropdownMenu } from '@/components/organisms/DropdownMenu'
import { EventType } from '@/interfaces/event'


export const ProductListTemplate = () => {
  const { productList } = useProductContext();
  const { user, menuVisible, setMenuVisible, handleDocumentClick } = useAuthContext();

  const [{ showProductUnits }] = useProductListTemplate({
    productList
  });

  return (
    <div className={styles.App} onClick={() => handleDocumentClick(menuVisible, setMenuVisible)}>
      <Header user={user} />

      <div className={styles.content}>
        <Sidebar />
        {showProductUnits?.length > 0 && <Products showProductUnitList={showProductUnits}/>}
        {menuVisible && <DropdownMenu />}
      </div>
      <div className={styles.footer}>
        {/* フッターの内容 */}
      </div>
    </div>
  )
}
