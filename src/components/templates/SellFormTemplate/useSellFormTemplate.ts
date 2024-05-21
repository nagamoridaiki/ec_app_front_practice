import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ProductType } from '@/interfaces/product';

type Params = {
  productList: Array<ProductType>
}

type ActionType = {
  handlePaymentChange:  (event: React.ChangeEvent<HTMLSelectElement>) => void
  handleShippingChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  setDeliveryDate: React.Dispatch<React.SetStateAction<string>>
  setDeliveryTime: React.Dispatch<React.SetStateAction<string>>
}

type StatesType = {
  paymentMethod: string,
  shippingOption: string,
  deliveryDates: string[]
};

export const useSellFormTemplate = ({productList}: Params) => {

  const [paymentMethod, setPaymentMethod] = useState('');
  const [shippingOption, setShippingOption] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [deliveryDates, setDeliveryDates] = useState<string[]>([]);

  const handlePaymentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handleShippingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setShippingOption(event.target.value);
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
      setDeliveryDates(dates);
    };

    generateDeliveryDates();
  }, []);

  const status: StatesType = {
    paymentMethod,
    shippingOption,
    deliveryDates
  }

  const action: ActionType = {
    handlePaymentChange,
    handleShippingChange,
    setDeliveryDate,
    setDeliveryTime
  }

  return [status, action] as const
}
