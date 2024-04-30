import { FC } from 'react';
import styles from './styles.module.css'
import { useAuthContext } from '@/contexts/AuthContext';
import { dropdownMenu } from './dropdownMenu'

export const DropdownMenu: FC<any> = () => {
  const { signOut } = useAuthContext();
  const [{ handleLogout }] = dropdownMenu({ signOut })

  return (
    <div className={styles.dropdownMenu}>
      <ul>
        <li>マイページ</li>
        <li><a href="/users/mypage">プロフィール</a></li>
        <li>保存した検索条件</li>
        <li>出品した商品</li>
        <li>購入した商品</li>
        <li><a href="/ec/product_regist">商品登録</a></li>
        <li onClick={(event) => handleLogout(event as any)}>ログアウト</li>
      </ul>
    </div>
  );
}