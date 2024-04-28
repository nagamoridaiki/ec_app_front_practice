import type { AppProps } from "next/app";
import { AuthProvider } from '@/contexts/AuthContext';
import { ProductProvider } from '@/contexts/ProductContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ProductProvider>
        <Component {...pageProps} />
      </ProductProvider>
    </AuthProvider>
  )
}
