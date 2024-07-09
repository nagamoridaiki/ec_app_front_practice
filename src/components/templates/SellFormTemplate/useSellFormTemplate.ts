import React, { useState, useEffect, useCallback } from 'react';
import { MergedProductType } from '@/interfaces/product';
import { UserType } from '@/interfaces/userType';
import { createSellingOrderApi } from '@/apis/sellingOrderApi'
import { CreateSellingOrderParams } from '@/interfaces/sellingOrder';

type Params = {
  inCartProducts: Array<MergedProductType>
}

type ActionType = {
  setName: React.Dispatch<React.SetStateAction<string>>,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  handlePaymentChange:  (event: React.ChangeEvent<HTMLSelectElement>) => void
  handleShippingChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  setDeliveryTime: React.Dispatch<React.SetStateAction<string>>
  setSelectDeliveryDates: React.Dispatch<React.SetStateAction<number>>
  setDeliveryZipCode: React.Dispatch<React.SetStateAction<string>>
  setDeliveryPrefecture: React.Dispatch<React.SetStateAction<string>>
  setDeliveryAddress1: React.Dispatch<React.SetStateAction<string>>
  setDeliveryAddress2: React.Dispatch<React.SetStateAction<string>>
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>
  createSellingOrder: (params: CreateSellingOrderParams) => Promise<void>
  createOrderDetails: any // TODO
  validateForm: () => boolean
}

type StatesType = {
  name: string,
  email: string,
  paymentMethod: string,
  shippingOption: string,
  deliveryDateOptions: string[],
  deliveryTime: string,
  selectDeliveryDates: number,
  delivery_zip_code: string,
  delivery_prefecture: string,
  delivery_address1: string,
  delivery_address2: string,
  phoneNumber: string,
  errors: Record<string, string>
};

export const useSellFormTemplate = () => {

  const [paymentMethod, setPaymentMethod] = useState('BANK_TRANSFER_REQUEST');
  const [shippingOption, setShippingOption] = useState('YAMATO_SMART_CAT');
  const [deliveryTime, setDeliveryTime] = useState('NO_SPECIFIED');
  const [deliveryDateOptions, setDeliveryDateOptions] = useState<string[]>([]);
  const [selectDeliveryDates, setSelectDeliveryDates] = useState(0);
  const [delivery_zip_code, setDeliveryZipCode] = useState('');
  const [delivery_prefecture, setDeliveryPrefecture] = useState('');
  const [delivery_address1, setDeliveryAddress1] = useState('');
  const [delivery_address2, setDeliveryAddress2] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name) newErrors.name = 'お名前を入力してください';
    if (!email) newErrors.email = 'メールアドレスを入力してください';
    if (!delivery_zip_code) newErrors.delivery_zip_code = '郵便番号を入力してください';
    if (!delivery_prefecture) newErrors.delivery_prefecture = '住所を入力してください';
    if (!phoneNumber) newErrors.phone_number = '電話番号を入力してください';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handleShippingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setShippingOption(selectedOption);
    if (selectedOption === "YAMATO_HOME_DELIVERY") {
      setSelectDeliveryDates(0);
    }
  };

  useEffect(() => {
    const generateDeliveryDates = () => {
      const dates = [];
      const today = new Date();
      for (let i = 2; i <= 5; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' } as const;
        dates.push(date.toLocaleDateString('ja-JP', options));
      }
      setDeliveryDateOptions(dates);
    };

    generateDeliveryDates();
  }, []);

  useEffect(() => {
    if (shippingOption == 'YAMATO_HOME_DELIVERY') {
      setSelectDeliveryDates(0); // 宅急便が選択されたとき、デフォルトで最短日を選択
    }
  }, [shippingOption]);

  const createSellingOrder = useCallback(async (params: CreateSellingOrderParams) => {
    const res = await createSellingOrderApi(params);
    if (res?.data && typeof res.data === 'object') return;
  }, []);


  const getSpecifiedDeliveryDate = (selectDeliveryDates: number, shippingOption: string) => {
    if (shippingOption == 'YAMATO_SMART_CAT') return selectDeliveryDates = 0;
    const today = new Date();
    today.setDate(today.getDate() + (selectDeliveryDates + 2));
    const millis = today.getTime();
    return { seconds: (millis / 1000).toString(), nanos: 0 };
  };

  const createOrderDetails = (
    user: UserType,
    phoneNumber: string,
    delivery_zip_code: string,
    delivery_prefecture: string,
    delivery_address1: string,
    delivery_address2: string,
    shippingOption: string,
    paymentMethod: string,
    inCartProducts: MergedProductType[],
    selectDeliveryDates: number,
    deliveryTime: string
  ) => {
    const amount = inCartProducts.reduce((total, product) => total + (product.price * product.inCartNum), 0) + 600 + 300;
    const specified_delivery_date = getSpecifiedDeliveryDate(selectDeliveryDates, shippingOption);
    const selling_order_inventories = inCartProducts.map(product => ({
      inventory_id: product.inventoryId,
      rank: product.rank,
      price: product.price,
      num: product.inCartNum
    }));

    return {
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
      amount,
      products_num: inCartProducts.length,
      specified_delivery_date,
      specified_delivery_time: deliveryTime,
      modification_type: 'AUTO',
      selling_order_inventories
    };
  };

  const status: StatesType = {
    name,
    email,
    paymentMethod,
    shippingOption,
    deliveryDateOptions,
    deliveryTime,
    selectDeliveryDates,
    delivery_zip_code,
    delivery_prefecture,
    delivery_address1,
    delivery_address2,
    phoneNumber,
    errors
  }

  const action: ActionType = {
    setName,
    setEmail,
    handlePaymentChange,
    handleShippingChange,
    setDeliveryTime,
    setSelectDeliveryDates,
    setDeliveryZipCode,
    setDeliveryPrefecture,
    setDeliveryAddress1,
    setDeliveryAddress2,
    setPhoneNumber,
    createSellingOrder,
    createOrderDetails,
    validateForm
  }

  return [status, action] as const
}
