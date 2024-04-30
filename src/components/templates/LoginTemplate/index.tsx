import { useEffect } from 'react';
import styles from './styles.module.css';
import { Header } from '@/components/organisms/header'
import { Loginform } from '@/components/organisms/loginform/index'
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import { NAVIGATION_LIST, NAVIGATION_PATH } from '@/constants/navigation';

export const LoginTemplate = () => {

  const { user } = useAuthContext();

  return (
    <div className={styles.App}>
    <Header user={user} />
      <div className={styles.signinContainer}>
        <h2>Login</h2>
        <Loginform />
      </div>
    </div>
  )
}