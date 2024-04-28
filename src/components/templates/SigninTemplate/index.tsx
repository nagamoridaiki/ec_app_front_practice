import styles from './styles.module.css';
import { Header } from '@/components/organisms/header'
import { FaTrash } from 'react-icons/fa';
import diningTableImage from '../../../../public/products/books/bible-1867195_1920.jpeg';
import chairImage from '../../../../public/products/books/book-1283468_1920.jpeg';

export const SigninTemplate = () => {


  return (
    <div className={styles.signinContainer}> {/* 横幅を調整 */}
      <h1>Sign In</h1>
      <form className={styles.signinForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>

        <button type="submit" className={styles.signinButton}>Sign In</button>
      </form>
    </div>
  )
}
