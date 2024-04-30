
import { useMemo, useState, useCallback, useEffect,  SetStateAction, Dispatch } from 'react';
import { ProductType, RegisterProductParams } from '@/interfaces/product';
import { EventType } from '@/interfaces/event';
import { registerProductApi } from '@/apis/productApi';
import { useRouter } from 'next/router';
import { NAVIGATION_PATH } from '@/constants/navigation';


type Params = {
  registerProduct: (params: RegisterProductParams) => Promise<void>
}

type StatesType = {
  title: string
  description?: string
  imageUrl?: string
  categoryId: number
};

type ActionsType = {
  handleRegisterProduct: EventType['onSubmit'];
  handleChangeTitle: EventType['onChangeInput'];
  handleChangeDescription: EventType['onChangeInput'];
  handleChangeImageUrl: EventType['onChangeInput'];
  handleChangeCategoryId: EventType['onChangeSelect'];
};

export const useProductRegistTemplate = ({registerProduct}: Params) => {
  const router = useRouter();
  const [ title, setTitle ] = useState<string>('');
  const [ description, setDescription ] = useState<string| undefined>(undefined);
  const [ imageUrl, setImageUrl ] = useState<string | undefined>(undefined);
  const [ categoryId, setCategoryId ] = useState<number>(0);

  const handleChangeTitle: EventType['onChangeInput'] = useCallback((event) => setTitle(event.target.value), []);
  const handleChangeDescription: EventType['onChangeInput'] = useCallback((event) => setDescription(event.target.value), []);
  const handleChangeImageUrl: EventType['onChangeInput'] = useCallback((event) => setImageUrl(event.target.value), []);
  const handleChangeCategoryId: EventType['onChangeSelect'] = useCallback((event) => setCategoryId(Number(event.target.value)), []);

  const handleRegisterProduct: EventType['onSubmit'] = useCallback(
    async (e) => {
      e.preventDefault();
      if (title !== '' && categoryId) {
        registerProduct({
          product_title: title,
          product_description: description,
          image_url: imageUrl,
          category_id: categoryId
        });
        router.push(NAVIGATION_PATH.TOP);
      }
    },
    [registerProduct, title, description, imageUrl, categoryId, router]
  );


  // const handleRegisterProduct = useCallback(async () => {
  //   const res = await registerProductApi({
  //     product_title: title,
  //     product_description: description,
  //     image_url: imageUrl,
  //     category_id: categoryId
  //   });
  //   if (res?.code === 500) {
  //     console.log(res.message);
  //     return;
  //   };
  //   console.log("resの中身", res)
  //   if (res.data?.productId) {
  //     router.push(`${NAVIGATION_PATH.DETAIL}/${res.data?.productId}`);
  //   };
  // }, [title, description, imageUrl, categoryId]);

  const states: StatesType = {
    title,
    description,
    imageUrl,
    categoryId
  };

  const actions: ActionsType = {
    handleRegisterProduct,
    handleChangeTitle,
    handleChangeDescription,
    handleChangeImageUrl,
    handleChangeCategoryId
  };

  return [states, actions] as const;
}
