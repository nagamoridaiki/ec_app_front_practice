
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { NAVIGATION_PATH } from '@/constants/navigation';
import { EventType } from '@/interfaces/event';

type Params = {
  signOut: () => Promise<void>;
}

type ActionsType = {
  handleLogout: EventType['onSubmit'];
};

export const dropdownMenu = ({ signOut }: Params) => {

  const router = useRouter();

  const handleLogout: EventType['onSubmit'] = useCallback(
    async (event) => {
      event.preventDefault();

      signOut();
      sessionStorage.removeItem('user');
      router.push(NAVIGATION_PATH.SIGNIN);
    }, []
  )

  const actions: ActionsType = {
    handleLogout
  };

  return [actions] as const;

}