import styles from './styles.module.css';
import React, { FC } from 'react';

type Props = {
  buttonText: string;
  buttonStyle: string;
}

export const CommonButton: FC<Props> = ({ buttonText, buttonStyle }) => {
  return (
    <button type="submit" className={styles[buttonStyle]}>{buttonText}</button>
  )
}
