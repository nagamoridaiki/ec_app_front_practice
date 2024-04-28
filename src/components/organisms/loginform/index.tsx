import { FC } from 'react';
import styles from './styles.module.css';
import { CommonButton } from '../../atoms/CommonButton'
import { useAuthContext } from '@/contexts/AuthContext';
import { InputForm } from '../../atoms/InputForm'
import { useLoginform } from './useLoginform'

export const Loginform: FC = () => {
  const { signIn } = useAuthContext();
  const [{ email, password }, { handleChangeEmail, handleChangePassword, handleLogin }] = useLoginform({signIn})

  return (
      <form className={styles.signinForm} onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <InputForm type="email" value={email} placeholder="email" onChange={handleChangeEmail} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password:</label>
            <InputForm type="password" value={password} placeholder="password" onChange={handleChangePassword} />
          </div>
          <CommonButton />
      </form>
  )
}
