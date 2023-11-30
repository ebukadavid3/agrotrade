import '@/styles/globals.css';
import Layout from '@/components/layout';
import { AppProvider } from '@/config/global';

export default function App({ Component, pageProps }) {
return (
  <AppProvider>
  <Layout>
    <Component {...pageProps} />
  </Layout>
  </AppProvider>
)
}
