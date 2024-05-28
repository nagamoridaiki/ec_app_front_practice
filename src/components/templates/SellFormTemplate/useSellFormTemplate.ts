import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ProductType, MergedProductType } from '@/interfaces/product';
import { createSellingOrderApi } from '@/apis/sellingOrderApi'
import { CreateSellingOrderParams, SellingOrderResponse } from '@/interfaces/sellingOrder';

type Params = {
  inCartProducts: Array<MergedProductType>
}

type ActionType = {
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
  getDeliveryDateInMillis:  (selectDeliveryDates: number) => number
}

type StatesType = {
  paymentMethod: string,
  shippingOption: string,
  deliveryDateOptions: string[],
  deliveryTime: string,
  selectDeliveryDates: number,
  delivery_zip_code: string,
  delivery_prefecture: string,
  delivery_address1: string,
  delivery_address2: string,
  phoneNumber: string
};

export const useSellFormTemplate = ({inCartProducts}: Params) => {

  const [paymentMethod, setPaymentMethod] = useState('BANK_TRANSFER_REQUEST');
  const [shippingOption, setShippingOption] = useState('YAMATO_SMART_CAT');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [deliveryDateOptions, setDeliveryDateOptions] = useState<string[]>([]);
  const [selectDeliveryDates, setSelectDeliveryDates] = useState(0);
  const [delivery_zip_code, setDeliveryZipCode] = useState('');
  const [delivery_prefecture, setDeliveryPrefecture] = useState('');
  const [delivery_address1, setDeliveryAddress1] = useState('');
  const [delivery_address2, setDeliveryAddress2] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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

  const getDeliveryDateInMillis = (selectDeliveryDates: number) => {
    const today = new Date();
    today.setDate(today.getDate() + (selectDeliveryDates + 2));
    return today.getTime();
  };

  const status: StatesType = {
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
  }

  const action: ActionType = {
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
    getDeliveryDateInMillis
  }

  return [status, action] as const
}
