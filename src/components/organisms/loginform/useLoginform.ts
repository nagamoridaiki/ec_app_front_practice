
import { UserType } from '@/interfaces/userType';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { signInApi } from '@/apis/authApi';
import { NAVIGATION_PATH } from '@/constants/navigation';
import { EventType } from '@/interfaces/event';


type Params = {
  signIn: (user: UserType) => Promise<void>;
}

type StatesType = {
  email: string;
  password: string;
};

type ActionsType = {
  handleChangeEmail: EventType['onChangeInput'];
  handleChangePassword: EventType['onChangeInput'];
  handleLogin: EventType['onSubmit'];
};

export const useLoginform = ({ signIn }: Params) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleChangeEmail: EventType['onChangeInput'] = useCallback((event) => setEmail(event.target.value), []);
  const handleChangePassword: EventType['onChangeInput'] = useCallback((event) => setPassword(event.target.value), []);

  const handleLogin: EventType['onSubmit'] = useCallback(
    async (event) => {
      event.preventDefault();
      const res = await signInApi(email, password)
      if (res?.code === 401) {
        console.log(res.message);
        return;
      }
      if (res.data?.user) {
        signIn(res.data?.user);
        sessionStorage.setItem('user', JSON.stringify(res.data?.user));
        router.push(NAVIGATION_PATH.TOP);
      }
    }, [email, password, signIn, router]
  )

  const states: StatesType = {
    email,
    password,
  };

  const actions: ActionsType = {
    handleChangeEmail,
    handleChangePassword,
    handleLogin,
  };

  return [states, actions] as const;

}