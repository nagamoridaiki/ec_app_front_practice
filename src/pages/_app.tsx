import type { AppProps } from "next/app";
import { AuthProvider } from '@/contexts/AuthContext';
import { ProductProvider } from '@/contexts/productContext';
import { ImageProvider } from '@/contexts/ImageContext';
import { CartProvider } from '@/contexts/CartContex';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <AuthProvider>
        <ImageProvider>
          <ProductProvider>
            <Component {...pageProps} />
          </ProductProvider>
        </ImageProvider>
      </AuthProvider>
    </CartProvider>
  )
}
