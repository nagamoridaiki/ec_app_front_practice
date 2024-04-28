import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { NAVIGATION_PATH } from '@/constants/navigation';

type ActionType = {
  handleMoveDetailPage: (id: number) => void
}

export const useProducts = () => {
  const router = useRouter();
  const handleMoveDetailPage = useCallback(
    (id: number) => router.push(`${NAVIGATION_PATH.DETAIL}${id}`),
    [router]
  )
  const actions: ActionType = {
    handleMoveDetailPage
  }

  return [actions] as const;
}
