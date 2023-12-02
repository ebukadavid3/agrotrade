import '@/styles/globals.css';
import Layout from '@/components/layout';
import { AppProvider } from '@/config/global';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps:{session,...pageProps} }) {
return (
  <SessionProvider session={session}>
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  </SessionProvider>
)
}
