import './Sidebar.css'

export const Sidebar = () => {
  return (
    <div>
        <aside className="filters">
          <div className="filter-section">
            <h3>Availability</h3>
            <label className="checkbox-custom">Purchase now
              <input type="checkbox" checked />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-custom">Ending soon
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <label>
              Min:
              <input type="number" placeholder="Min price" className="price-input" />
            </label>
            <label>
              Max:
              <input type="number" placeholder="Max price" className="price-input" />
            </label>
          </div>

          <div className="filter-section">
            <h3>Condition</h3>
            <label className="checkbox-custom">S (New)
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-custom">A (Like New)
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-custom">B (Good)
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-custom">C (Fair)
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </div>
        </aside>
    </div>
  )
}