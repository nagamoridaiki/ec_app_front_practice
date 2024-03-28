import styles from './styles.module.css'

export const Sidebar = () => {
  return (
    <div>
        <aside className={styles.filters}>
          <div className={styles.filterSection}>
            <h3>Availability</h3>
            <label className={styles.checkboxCustom}>Purchase now
              <input type="checkbox" checked />
              <span className={styles.checkmark}></span>
            </label>
            <label className={styles.checkboxCustom}>Ending soon
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
            </label>
          </div>

          <div className={styles.filterSection}>
            <h3>Price Range</h3>
            <label>
              Min:
              <input type="number" placeholder="Min price" className={styles.priceInput} />
            </label>
            <label>
              Max:
              <input type="number" placeholder="Max price" className={styles.priceInput} />
            </label>
          </div>

          <div className={styles.filterSection}>
            <h3>Condition</h3>
            <label className={styles.checkboxCustom}>S (New)
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
            </label>
            <label className={styles.checkboxCustom}>A (Like New)
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
            </label>
            <label className={styles.checkboxCustom}>B (Good)
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
            </label>
            <label className={styles.checkboxCustom}>C (Fair)
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
            </label>
          </div>
        </aside>
    </div>
  )
}