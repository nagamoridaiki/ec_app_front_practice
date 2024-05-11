import styles from './styles.module.css';
import { Header } from '../../organisms/Header'
import { useAuthContext } from '@/contexts/AuthContext';
import { DropdownMenu } from '@/components/organisms/DropdownMenu'

export const MyPageTemplate = () => {

  const { user, menuVisible, setMenuVisible, handleDocumentClick } = useAuthContext();

  return (
    <div className={styles.app} onClick={() => handleDocumentClick(menuVisible, setMenuVisible)}>
      <Header user={user} />

      <main className={styles.signinContainer}>
        <h1>My Page</h1>
        <div className={styles.userDataDisplay}>
          <p>Name: John Doe</p>
          <p>Email: john.doe@example.com</p>
          <p>Password: ********</p>
        </div>
        <div style={{ margin: '20px 0' }}><hr className={styles.userDataDivider} /></div>
        <form className={styles.signinForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="New name" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="New email" />
          </div>

          <div className={`${styles.formGroup} ${styles.passwordUpdateSection}`}>
            <label htmlFor="password">New Password:</label>
            <input type="password" id="password" name="password" placeholder="New password" />
            <label htmlFor="password-confirm">Confirm:</label>
            <input type="password" id="password-confirm" name="password-confirm" placeholder="Confirm new password" />
          </div>
          <button type="submit" className={styles.signinButton}>Update</button>
        </form>
      </main>
      {menuVisible && <DropdownMenu />}

      <footer className={styles.footer}>
        {/* フッターの内容 */}
      </footer>
    </div>
  )
}
