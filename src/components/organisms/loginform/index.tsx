import { FC, useState, useEffect } from 'react';
import styles from './styles.module.css';
import { CommonButton } from '../../atoms/CommonButton'
import { useAuthContext } from '@/contexts/AuthContext';
import { InputForm } from '../../atoms/InputForm'
import { useLoginform } from './useLoginform'

export const Loginform: FC = () => {
  const { signIn } = useAuthContext();
  const [{ email, password }, { handleChangeEmail, handleChangePassword, handleLogin }] = useLoginform({signIn})
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
      <form className={styles.signinForm} onSubmit={(e) => handleLogin(e, setErrorMessage)}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <InputForm type="email" value={email} placeholder="email" onChange={handleChangeEmail} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password:</label>
            <InputForm type="password" value={password} placeholder="password" onChange={handleChangePassword} />
          </div>
          {errorMessage && <div className={styles.errorMessage} style={{ color: 'white', backgroundColor: 'lightpink', padding: '10px', borderRadius: '5px' }}>{errorMessage}</div>}
          <CommonButton buttonText="Login" buttonStyle="signinButton" />
      </form>
  )
}
