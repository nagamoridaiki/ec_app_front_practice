import { FC, ReactNode, useContext, createContext, SetStateAction, Dispatch } from 'react';
import { UserType } from '@/interfaces/userType';
import { useAuth } from '@/hooks/useAuth';

type Props = {
  children: ReactNode;
};

interface ContextInterface {
  user: UserType | undefined;
  isAuth: boolean;
  signIn: (user: UserType) => Promise<void>;
  signOut: () => Promise<void>;
  authRouting: () => Promise<void>;
  isAuthenticated: () => boolean;
  setMenuVisible: Dispatch<SetStateAction<boolean>>
  menuVisible: boolean,
  handleDocumentClick: (menuVisible: boolean, setMenuVisible: Dispatch<SetStateAction<boolean>>) => void
}

const AuthContext = createContext({} as ContextInterface);

export const AuthProvider: FC<Props> = ({ children }) => {
  const { user, signIn, signOut, isAuth, authRouting, isAuthenticated, setMenuVisible, menuVisible, handleDocumentClick } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isAuth,
        authRouting,
        isAuthenticated,
        setMenuVisible,
        menuVisible,
        handleDocumentClick
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
