
import './ProductListTemplate.css';
import { useProductListTemplate } from './useProductListTemplate';

import { useProductContext } from '../../../contexts/productContext';

import { Header } from '../../organisms/header'
import { Sidebar } from '../../organisms/sidebar'
import { Products } from '../../organisms/products';

export const ProductListTemplate = () => {

  const { productList } = useProductContext();

  const [{ showProductList }] = useProductListTemplate({
    productList
  });

  console.log("showProductListの中身1", showProductList)

  return (
    <div className="App">
      <Header />

      <div className="content">
        <Sidebar />
        {/* <Products /> */}
        {showProductList?.length > 0 && <Products showProductList={showProductList}/>}
      </div>
      <div className="footer">
        {/* フッターの内容 */}
      </div>
    </div>
  )
}
