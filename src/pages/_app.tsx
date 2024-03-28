import type { AppProps } from "next/app";
import { ProductProvider } from '@/src/contexts/productContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProductProvider>
      <Component {...pageProps} />
    </ProductProvider>
  )
}
