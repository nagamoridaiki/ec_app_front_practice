
import { useState, useCallback } from 'react';
import { RegisterProductParams } from '@/interfaces/product';
import { EventType } from '@/interfaces/event';
import { useRouter } from 'next/router';
import { NAVIGATION_PATH } from '@/constants/navigation';

type Params = {
  registerProduct: (params: RegisterProductParams) => Promise<void>
  imageUrl: string | undefined
}

type StatesType = {
  title: string
  note?: string
  imageUrl?: string
  categoryId: number
};

type ActionsType = {
  handleRegisterProduct: EventType['onSubmit'];
  handleChangeTitle: EventType['onChangeInput'];
  handleChangeDescription: EventType['onChangeInput'];
  handleChangeImageUrl: (imageUrl: string | undefined) => void;
  handleChangeCategoryId: EventType['onChangeSelect'];
};

export const useProductRegistTemplate = ({registerProduct, imageUrl}: Params) => {
  const router = useRouter();
  const [ title, setTitle ] = useState<string>('');
  const [ note, setNote ] = useState<string| undefined>(undefined);
  const [ image, setImage ] = useState<string| undefined>(undefined);
  const [ categoryId, setCategoryId ] = useState<number>(0);

  const handleChangeTitle: EventType['onChangeInput'] = useCallback((event) => setTitle(event.target.value), []);
  const handleChangeDescription: EventType['onChangeInput'] = useCallback((event) => setNote(event.target.value), []);
  const handleChangeImageUrl: (imageUrl: string | undefined) => void = useCallback((imageUrl: string | undefined) => {
    setImage(imageUrl)
  }, [image, imageUrl]);
  const handleChangeCategoryId: EventType['onChangeSelect'] = useCallback((event) => setCategoryId(Number(event.target.value)), []);

  const handleRegisterProduct: EventType['onSubmit'] = useCallback(
    async (e) => {
      e.preventDefault();
      if (title !== '' && categoryId) {
        registerProduct({
          title: title,
          note: note,
          image_url: imageUrl,
          category_id: categoryId
        });
        router.push(NAVIGATION_PATH.TOP);
      }
    },
    [registerProduct, title, note, imageUrl, categoryId, router]
  );

  const states: StatesType = {
    title,
    note,
    imageUrl,
    categoryId
  };

  const actions: ActionsType = {
    handleRegisterProduct,
    handleChangeTitle,
    handleChangeDescription,
    handleChangeImageUrl,
    handleChangeCategoryId,
  };

  return [states, actions] as const;
}
