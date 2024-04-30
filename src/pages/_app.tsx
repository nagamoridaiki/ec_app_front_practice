import type { AppProps } from "next/app";
import { AuthProvider } from '@/contexts/AuthContext';
import { ProductProvider } from '@/contexts/productContext';
import { ImageProvider } from '@/contexts/ImageContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ImageProvider>
        <ProductProvider>
          <Component {...pageProps} />
        </ProductProvider>
      </ImageProvider>
    </AuthProvider>
  )
}
