import styles from './styles.module.css';
import { Header } from '@/components/organisms/header'
import { FaTrash } from 'react-icons/fa';
import diningTableImage from '../../../../public/products/books/bible-1867195_1920.jpeg';
import chairImage from '../../../../public/products/books/book-1283468_1920.jpeg';
import { useAuthContext } from '@/contexts/AuthContext';
import { useProductContext } from '@/contexts/productContext';
import { DropdownMenu } from '@/components/organisms/DropdownMenu'
import { useProductRegistTemplate } from './useProductRegistTemplate';
import { CommonButton } from '../../atoms/CommonButton'
import { InputForm } from '../../atoms/InputForm'

export const ProductRegistTemplate = () => {
  const { user, menuVisible, setMenuVisible, handleDocumentClick } = useAuthContext();
  const { registerProduct, product, categoriesList } = useProductContext();

  const [{
    title,
    description,
    imageUrl,
    categoryId
  }, {
    handleRegisterProduct,
    handleChangeTitle,
    handleChangeDescription,
    handleChangeImageUrl,
    handleChangeCategoryId
  }] = useProductRegistTemplate({registerProduct});


  return (
    <div className={styles.app} onClick={() => handleDocumentClick(menuVisible, setMenuVisible)}>
      <Header user={user} />

      <div className={styles.productRegistrationContainer}>
        <h1>Product Registration</h1>
        <form className={styles.productRegistrationForm} onSubmit={handleRegisterProduct}>
          <div className={styles.formGroup}>
            <label htmlFor="productName">Product Name:</label>
            <InputForm type="title" value={title} placeholder="title" onChange={handleChangeTitle} required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="productName">Product Description:</label>
            <InputForm type="description" value={description} placeholder="description" onChange={handleChangeDescription} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="productName">Category:</label>
            <select id="category" value={categoryId} onChange={handleChangeCategoryId} required>
              <option value="">Select a category</option>
            {categoriesList.map(category => (
              <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
            ))}
            </select>
          </div>

          {/* <div className={styles.formGroup}>
            <label htmlFor="productImage">Product Image:</label>
            <input type="file" id="productImage" name="productImage" accept="image/*" required />
          </div> */}

          <button type="submit" className={styles.submitButton}>Register Product</button>
        </form>
        {menuVisible && <DropdownMenu />}
      </div>

    </div>
  )
}
