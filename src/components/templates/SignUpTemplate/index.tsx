import styles from './styles.module.css';
import { SignUpForm } from '@/components/organisms/SignUpForm/index'

export const SignUpTemplate = () => {

  return (
    <div className={styles.App}>
      <div className={styles.signinContainer}>
        <h2>会員登録</h2>
        <SignUpForm />
        <div className={styles.signupLink}>
          <div onClick={() => window.location.href='/login'} className={styles.signupButton}>ログイン</div>
        </div>
      </div>
    </div>
  )
}


