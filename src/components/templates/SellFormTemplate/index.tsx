import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useAuthContext } from '@/contexts/AuthContext';
import { Header } from '@/components/organisms/Header';
import { useCart } from '@/hooks/useCart';
import { useProductContext } from '@/contexts/productContext';
import { useSellFormTemplate } from './useSellFormTemplate';

const prefectures = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県", "茨城県", "栃木県", "群馬県",
  "埼玉県", "千葉県", "東京都", "神奈川県", "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県",
  "岐阜県", "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
  "鳥取県", "島根県", "岡山県", "広島県", "山口県", "徳島県", "香川県", "愛媛県", "高知県", "福岡県",
  "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
];

export const SellFormTemplate = () => {
  const { user, menuVisible, setMenuVisible, handleDocumentClick } = useAuthContext();
  const { productList } = useProductContext();
  const { inCartProducts } = useCart(user?.user_id, productList);

  const [
    {
      paymentMethod,
      shippingOption,
      deliveryDateOptions,
      deliveryTime,
      selectDeliveryDates,
      delivery_zip_code,
      delivery_prefecture,
      delivery_address1,
      delivery_address2,
      phoneNumber
    },
    {
      handlePaymentChange,
      handleShippingChange,
      setDeliveryTime,
      setSelectDeliveryDates,
      createSellingOrder,
      setDeliveryZipCode,
      setDeliveryPrefecture,
      setDeliveryAddress1,
      setDeliveryAddress2,
      setPhoneNumber,
      getDeliveryDateInMillis
    }
  ] = useSellFormTemplate({ inCartProducts });


  return (
    <div className={styles.app} onClick={() => handleDocumentClick(menuVisible, setMenuVisible)}>
      <Header user={user} />

      <div className={styles.container}>
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>お名前</label>
            <input id="name" type="text" className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="delivery_zip_code" className={styles.label}>郵便番号</label>
            <input id="delivery_zip_code" type="text" className={`${styles.input} ${styles.shortInput}`} onChange={(e) => setDeliveryZipCode(e.target.value)} />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="delivery_prefecture" className={styles.label}>住所</label>
            <select id="delivery_prefecture" className={`${styles.select}  ${styles.shortInput}`} onChange={(e) => setDeliveryPrefecture(e.target.value)}>
              <option value="">選択してください</option>
              {prefectures.map((prefecture, index) => (
                <option key={index} value={prefecture}>{prefecture}</option>
              ))}
            </select>
          </div>
          <div className={styles.inputGroup}>
            <span className={`${styles.description} ${styles.lightGray}`}>市区町村、番地等（例：四日市市川島町6200-9）</span>
            <input id="city" type="text" className={styles.input} onChange={(e) => setDeliveryAddress1(e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <span className={styles.description}>アパート・マンション・ビル名、部屋番号等</span>
            <input id="delivery_address2" type="text" className={styles.input} onChange={(e) => setDeliveryAddress2(e.target.value)} />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>メールアドレス</label>
            <input id="email" type="email" className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="phone" className={styles.label}>電話番号</label>
            <input id="phone" type="tel" className={`${styles.input} ${styles.shortInput}`} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="paymentMethod" className={styles.label}>お支払い方法</label>
            <select id="paymentMethod" className={styles.select} onChange={handlePaymentChange}>
              <option value="BANK_TRANSFER_REQUEST">銀行振込</option>
              <option value="CASH_ON_DELIVERY">代金引換</option>
              <option value="PAYPAY">PayPay</option>
              <option value="CREDIT_CARD">クレジットカード</option>
            </select>
          </div>
          {paymentMethod == 'CREDIT_CARD' && (
            <div className={styles.creditCardInfo}>
              <div className={styles.inputGroup}>
                <label htmlFor="cardNumber" className={styles.label}>カード番号</label>
                <input id="cardNumber" type="text" className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="expiryDate" className={styles.label}>有効期限</label>
                <input id="expiryDate" type="text" className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="cvv" className={styles.label}>CVV</label>
                <input id="cvv" type="text" className={styles.input} />
              </div>
            </div>
          )}
          <div className={styles.inputGroup}>
            <label htmlFor="shippingOption" className={styles.label}>配送オプション</label>
            <select id="shippingOption" className={styles.select} onChange={handleShippingChange}>
              <option value="YAMATO_SMART_CAT">ネコボス</option>
              <option value="YAMATO_HOME_DELIVERY">宅急便</option>
            </select>
          </div>
          {shippingOption == 'YAMATO_HOME_DELIVERY' && (
            <div className={styles.takkyubinInfo}>
              <div className={styles.inputGroup}>
                <label htmlFor="deliveryDate" className={styles.label}>配達日</label>
                <select id="deliveryDate" className={styles.select}
                onChange={(e) => {
                  setSelectDeliveryDates(e.target.selectedIndex);
                }}>
                  {deliveryDateOptions.map((date, index) => (
                    <option key={index} value={date}>{date}</option>
                  ))}
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="deliveryTime" className={styles.label}>時間帯</label>
                <select id="deliveryTime" className={styles.select} onChange={(e) => setDeliveryTime(e.target.value)}>
                  <option value="TIME_0800_1200">午前中</option>
                  <option value="TIME_1400_1600">14時〜16時</option>
                  <option value="TIME_1600_1800">16時〜18時</option>
                  <option value="TIME_1800_2000">18時〜20時</option>
                  <option value="TIME_1900_2100">19時〜21時</option>
                </select>
              </div>
            </div>
          )}
          <div className={styles.submitGroup}>
          <button type="button" className={styles.submitButton} onClick={() => {
              const orderDetails = {
                user_id: user!.user_id,
                order_status: 'SHIPPING',
                delivery_name: user!.name,
                delivery_phone_number: phoneNumber,
                delivery_zip_code: delivery_zip_code,
                delivery_prefecture: delivery_prefecture,
                delivery_address1: delivery_address1,
                delivery_address2: delivery_address2,
                delivery_method: shippingOption,
                payment_method: paymentMethod,
                amount: inCartProducts.reduce((total, product) => total + (product.price * product.inCartNum), 0) + 600 + 300,
                products_num: inCartProducts.length,
                specified_delivery_date: selectDeliveryDates ? { seconds: (getDeliveryDateInMillis(selectDeliveryDates) / 1000).toString(), nanos: 0 } : undefined,
                specified_delivery_time: deliveryTime,
                modification_type: 'AUTO',
                selling_order_inventories: inCartProducts.map(product => ({
                    inventory_id: product.inventoryId,
                    rank: product.rank,
                    price: product.price,
                    num: product.inCartNum
                }))
              };
              console.log("orderDetailsの中身", orderDetails);
              createSellingOrder(orderDetails);
            }}>送信する</button>
          </div>
        </form>
        <div className={styles.summary}>
          <div className={styles.productSummary}>
            {inCartProducts.map((product, index) => (
              <div key={index} className={styles.summaryItem}>
                <span>{product.title} x{product.inCartNum}</span>
                <span>¥{product.price * product.inCartNum}</span>
              </div>
            ))}
          </div>
          <div className={styles.summaryItem}>
              <span>商品合計</span>
              <span>¥{inCartProducts.reduce((total, product) => total + (product.price * product.inCartNum), 0)}</span>
            </div>
          <div className={styles.otherSummary}>
            <div className={styles.summaryItem}><span>送料</span><span>¥600</span></div>
            <div className={styles.summaryItem}><span>手数料</span><span>¥300</span></div>
          </div>
          <div className={styles.totalSummary}>
            <span>合計</span>
            <span>
              ¥{inCartProducts.reduce((total, product) => total + (product.price * product.inCartNum), 0) + 600 + 300}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
