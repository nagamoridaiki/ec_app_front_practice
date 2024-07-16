import { UserType } from '@/interfaces/userType';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { signInApi, signUpApi } from '@/apis/authApi';
import { NAVIGATION_PATH } from '@/constants/navigation';
import { EventType } from '@/interfaces/event';

type Params = {
  signIn: (user: UserType) => Promise<void>;
}

type StatesType = {
  name: string;
  email: string;
  password: string;
};

type ActionsType = {
  handleChangeName: EventType['onChangeInput'];
  handleChangeEmail: EventType['onChangeInput'];
  handleChangePassword: EventType['onChangeInput'];
  handleSignUp: (event: React.FormEvent<HTMLFormElement>, setErrorMessage: (message: string) => void) => Promise<void>;
};

export const useSignUpForm = ({ signIn }: Params) => {

  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleChangeName: EventType['onChangeInput'] = useCallback((event) => setName(event.target.value), []);
  const handleChangeEmail: EventType['onChangeInput'] = useCallback((event) => setEmail(event.target.value), []);
  const handleChangePassword: EventType['onChangeInput'] = useCallback((event) => setPassword(event.target.value), []);

  const handleSignUp = useCallback(
    async (event: React.FormEvent<HTMLFormElement>, setErrorMessage: (message: string) => void) => {
      event.preventDefault();
      const res = await signUpApi(name, email, password)
      if (res?.code === 401) {
        console.log(res.message);
        setErrorMessage(res.message ?? 'An error occurred');
        return;
      }
      // TODO: メールを飛ばして認証させるのもアリ

      if (res.data?.name && res.data?.email && res.data?.password) {
        signIn({
          user_id: res.data.user_id,
          name: res.data.name,
          email: res.data.email,
        });
        sessionStorage.setItem('user', JSON.stringify({
          user_id: res.data.user_id,
          name: res.data.name,
          email: res.data.email,
        }));
        router.push(NAVIGATION_PATH.TOP);
      }
    }, [email, password, signIn, router]
  )

  const states: StatesType = {
    name,
    email,
    password,
  };

  const actions: ActionsType = {
    handleChangeName,
    handleChangeEmail,
    handleChangePassword,
    handleSignUp,
  };

  return [states, actions] as const;

}