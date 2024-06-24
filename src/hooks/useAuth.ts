import {
  useState,
  useCallback,
  useEffect,
  SetStateAction,
  Dispatch
} from 'react'

import { useRouter } from 'next/router';
import { UserType } from '@/interfaces/userType'
import { authenticationApi } from '@/apis/authApi';
import { NAVIGATION_LIST, NAVIGATION_PATH } from '@/constants/navigation';

export const useAuth = () => {
  const router = useRouter();
  const [ user, setUser ] = useState<UserType | undefined>(undefined);
  const [ isAuth, setIsAuth ] = useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const signIn = useCallback(async (user: UserType) => {
    setUser(user);
    setIsAuth(true);
  }, []);

  const signOut = useCallback(async () => {
    sessionStorage.removeItem('user');
    setUser(undefined);
    setIsAuth(false);
  }, [])

  const isExitBeforeAuthPage = useCallback(() => {
    return router.pathname === NAVIGATION_PATH.SIGNIN || router.pathname === NAVIGATION_PATH.SIGNUP;
  }, [router.pathname]);

  const authRouting = useCallback(async () => {
    let auth = false
    const res = await authenticationApi();
    if (res?.data?.user) {
      setUser(res?.data?.user);
      setIsAuth(true);
      auth = true;
    }
    // 未ログインでログイン後のページにいる場合、ログイン画面にリダイレクト
    if (!auth && !isExitBeforeAuthPage()) router.push(NAVIGATION_LIST.SIGNIN);
    // ログイン済で未ログインのページにいる場合、Todo一覧ページにリダイレクト
    if (auth && isExitBeforeAuthPage()) router.push(NAVIGATION_LIST.TOP);
  }, []);

  const isAuthenticated = useCallback(() => {
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      const parsedUser = JSON.parse(sessionUser) as UserType;
      setUser(parsedUser);
      setIsAuth(true);
    }
    // 未ログインでログイン後のページにいる場合、ログイン画面にリダイレクト
    if (!sessionUser && !isExitBeforeAuthPage()) router.push(NAVIGATION_LIST.SIGNIN);
    // ログイン済で未ログインのページにいる場合、Todo一覧ページにリダイレクト
    if (sessionUser && isExitBeforeAuthPage()) router.push(NAVIGATION_LIST.TOP);

    return isAuth;
  }, [isAuth]);

  const handleDocumentClick = (menuVisible: boolean, setMenuVisible: Dispatch<SetStateAction<boolean>>) => {
    if (menuVisible) {
      setMenuVisible(!menuVisible);
    }
  }

  useEffect(() => {
    isAuthenticated();
  }, [isAuthenticated]);

  return {
    user,
    signIn,
    signOut,
    isAuth,
    authRouting,
    isAuthenticated,
    setMenuVisible,
    menuVisible,
    handleDocumentClick
  }
}

