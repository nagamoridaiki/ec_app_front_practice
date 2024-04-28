import { FC } from 'react';
import styles from './styles.module.css';

export const InputForm: FC<JSX.IntrinsicElements['input']> = ({disabled = false, value, type = 'text', placeholder, onChange, onKeyDown}) => (
  <input
    disabled={disabled}
    type={type}
    className={styles.input}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
  />
)
