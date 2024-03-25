
import './ProductListTemplate.css';
import { useProductListTemplate } from './useProductListTemplate';
import diningTableImage from '../../../products/books/bible-1867195_1920.jpeg';
import chairImage from '../../../products/books/book-1283468_1920.jpeg';
import lampImage from '../../../products/books/book-3510326_1920.jpeg';
import sofaImage from '../../../products/books/paper-3061485_1920.jpeg';
import bookshelfImage from '../../../products/books/rashtravardhan-kataria.jpeg';
import deskImage from '../../../products/books/tea-time-3240766_1920.jpeg';
import bedImage from '../../../products/clothes/black-shirts.jpeg';
import wardrobeImage from '../../../products/clothes/blank-1886001_1920.png';
import coffeeTableImage from '../../../products/clothes/blank-1886008_1920.png';
import armchairImage from '../../../products/clothes/fashion-1283863_1920.jpeg';
import stoolImage from '../../../products/clothes/man-407095_1920.jpeg';
import floorLampImage from '../../../products/clothes/shirt-2878932_1920.jpeg';
import { useProductContext } from '../../../contexts/productContext';

import { Header } from '../../organisms/header'
import { Sidebar } from '../../organisms/sidebar'

export const ProductListTemplate = () => {

  const { productList } = useProductContext();



  return (
    <div className="App">
      <Header />

      <div className="content">
        <Sidebar />

        <section className="products">
          {/* 各商品情報を繰り返し表示 */}
          <div className="product">
            <img src={diningTableImage} alt="Dining table" />
            <p>Dining table</p>
            <p>$150.00</p>
            {/* その他の詳細 */}
          </div>
          <div className="product">
            <img src={chairImage} alt="Comfortable chair" />
            <p>Comfortable chair</p>
            <p>$75.00</p>
            {/* その他の詳細 */}
          </div>
          <div className="product">
            <img src={lampImage} alt="Modern lamp" />
            <p>Modern lamp</p>
            <p>$45.00</p>
            {/* その他の詳細 */}
          </div>
          <div className="product">
            <img src={sofaImage} alt="Cozy sofa" />
            <p>Cozy sofa</p>
            <p>$300.00</p>
            {/* その他の詳細 */}
          </div>
          <div className="product">
            <img src={bookshelfImage} alt="Spacious bookshelf" />
            <p>Spacious bookshelf</p>
            <p>$120.00</p>
            {/* その他の詳細 */}
          </div>
          <div className="product">
            <img src={deskImage} alt="Office desk" />
            <p>Office desk</p>
            <p>$200.00</p>
            {/* その他の詳細 */}
          </div>
          <div className="product">
            <img src={bedImage} alt="Comfortable bed" />
            <p>Comfortable bed</p>
            <p>$400.00</p>
            {/* その他の詳細 */}
          </div>
          <div className="product">
            <img src={wardrobeImage} alt="Spacious wardrobe" />
            <p>Spacious wardrobe</p>
            <p>$250.00</p>
            {/* その他の詳細 */}
          </div>
          <div className="product">
            <img src={coffeeTableImage} alt="Modern coffee table" />
            <p>Modern coffee table</p>
            <p>$85.00</p>
            {/* その他の詳細 */}
          </div>
          <div className="product">
            <img src={armchairImage} alt="Stylish armchair" />
            <p>Stylish armchair</p>
            <p>$125.00</p>
            {/* その他の詳細 */}
          </div>
          <div className="product">
            <img src={stoolImage} alt="Ergonomic stool" />
            <p>Ergonomic stool</p>
            <p>$50.00</p>
            {/* その他の詳細 */}
          </div>
          <div className="product">
            <img src={floorLampImage} alt="Elegant floor lamp" />
            <p>Elegant floor lamp</p>
            <p>$70.00</p>
            {/* その他の詳細 */}
          </div>
          {/* 他の商品コンポーネント */}
        </section>
      </div>
      <div className="footer">
        {/* フッターの内容 */}
      </div>
    </div>
  )
}
