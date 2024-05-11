import styles from './styles.module.css';

export const SigninTemplate = () => {
  return (
    <div className={styles.signinContainer}>
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
