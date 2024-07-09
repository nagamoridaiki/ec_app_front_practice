import React from 'react';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import { useAuthContext } from '@/contexts/AuthContext';
import { Header } from '@/components/organisms/Header';


export const SellingOrderCompleteTemplate = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  return (
    <div className={styles.container}>
      <Header user={user} />
      <div className={styles.message}>
        <h1>注文が完了しました</h1>
        <button onClick={() => router.push('/')}>TOP画面に戻る</button>
      </div>
    </div>
  );
};
