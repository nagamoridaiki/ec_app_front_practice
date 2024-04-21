import styles from './styles.module.css';
import { useProductListTemplate } from './useProductListTemplate';

import { useProductContext } from '../../../contexts/productContext';

import { Header } from '../../organisms/header'
import { Sidebar } from '../../organisms/sidebar'
import { Products } from '../../organisms/products';

export const ProductListTemplate = () => {

  const { productList } = useProductContext();

  const [{ showProductUnits }] = useProductListTemplate({
    productList
  });

  return (
    <div className={styles.App}>
      <Header />

      <div className={styles.content}>
        <Sidebar />
        {/* <Products /> */}
        {showProductUnits?.length > 0 && <Products showProductUnitList={showProductUnits}/>}
      </div>
      <div className={styles.footer}>
        {/* フッターの内容 */}
      </div>
    </div>
  )
}
