import { AppProps } from 'next/app';
import { Header } from '../components/Header';

import '../styles/global.scss';

import { Provider as NextAuthProvider } from 'next-auth/client';

import{ PayPalScriptProvider } from '@paypal/react-paypal-js';

const initialOptions = {
  "client-id": "Af8XDgLYrqLJr8N2p481iLXW9I6BysOE8joQ74gdOtCLkBbX6q4PvS6gkN-4bwhXbyyMJ8E-ZvBLCgoj",
  currency: "BRL",
  intent:"capture",

};


function MyApp({ Component, pageProps }: AppProps) {
  return (
  <NextAuthProvider session={pageProps.session}>
    
    <PayPalScriptProvider options={initialOptions}>
    
      <Header/>

      <Component {...pageProps} />

    </PayPalScriptProvider>

  </NextAuthProvider>
  )
}

export default MyApp
