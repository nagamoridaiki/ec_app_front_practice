import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { NAVIGATION_PATH } from '@/constants/navigation';
import { fetchCartListApi } from '@/apis/cartApi';
import { CartObject, fetchCartItem } from '../../../interfaces/cart';

type StatesType = {
  showCartItems: Array<fetchCartItem>
  existingCartItems: Array<CartObject>
};

type ActionType = {
  handleMoveDetailPage: (id: number) => void
}

export const useProducts = (user_id: number| undefined) => {
  const router = useRouter();

  const [showCartItems, setShowCartItems] = useState<Array<fetchCartItem>>([]);

  const handleMoveDetailPage = useCallback(
    (id: number) => router.push(`${NAVIGATION_PATH.DETAIL}${id}`),
    [router]
  )

  const fetchCartItems = useCallback(async (user_id: number | undefined): Promise<void> => {
    if (!user_id) return
    const res = await fetchCartListApi(user_id);
    setShowCartItems(res?.data && typeof res.data === 'object' ? res.data : []);
  }, [showCartItems]);

  const existingCartItems = useMemo(
    () => {
      const cartObject: Array<CartObject> = showCartItems.map(item => {
        return {
          inventoryId: item.inventoryId,
          addToCartCount: item.num
        }
      })
      return cartObject
    }, [showCartItems]
  )

  useEffect(() => {
    fetchCartItems(user_id)
  }, [user_id]);

  const states: StatesType = {
    showCartItems,
    existingCartItems,
  };

  const actions: ActionType = {
    handleMoveDetailPage
  }

  return [states, actions] as const;
}
