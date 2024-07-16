import styles from './styles.module.css';
import { Header } from '@/components/organisms/Header'
import { Loginform } from '@/components/organisms/loginform/index'
import { useAuthContext } from '@/contexts/AuthContext';

export const LoginTemplate = () => {

  const { user } = useAuthContext();

  return (
    <div className={styles.App}>
      <div className={styles.signinContainer}>
        <h2>Login</h2>
        <Loginform />
        <div className={styles.signupLink}>
          <div onClick={() => window.location.href='/signup'} className={styles.signupButton}>新規会員登録</div>
        </div>
      </div>
    </div>
  )
}
