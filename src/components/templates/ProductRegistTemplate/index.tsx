import styles from './styles.module.css';
import { Header } from '@/components/organisms/header'
import { FaTrash } from 'react-icons/fa';
import diningTableImage from '../../../../public/products/books/bible-1867195_1920.jpeg';
import chairImage from '../../../../public/products/books/book-1283468_1920.jpeg';
import { useAuthContext } from '@/contexts/AuthContext';
import { DropdownMenu } from '@/components/organisms/DropdownMenu'

export const ProductRegistTemplate = () => {
  const { user, menuVisible, setMenuVisible, handleDocumentClick } = useAuthContext();

  return (
    <div className={styles.app}>
      <Header user={user} />

      <div className={styles.productRegistrationContainer}>
        <h1>Product Registration</h1>
        <form className={styles.productRegistrationForm}>
          <div className={styles.formGroup}>
            <label htmlFor="productName">Product Name:</label>
            <input type="text" id="productName" name="productName" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="productName">Product Description:</label>
            <input type="text" id="productName" name="productName" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="productName">Category:</label>
            <input type="text" id="productName" name="productName" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="productImage">Product Image:</label>
            <input type="file" id="productImage" name="productImage" accept="image/*" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="productPrice">Price:</label>
            <input type="number" id="productPrice" name="productPrice" step="0.01" required />
          </div>

          <button type="submit" className={styles.submitButton}>Register Product</button>
        </form>
      </div>

    </div>
  )
}
