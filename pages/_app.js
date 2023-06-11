import '@/styles/globals.css'
import { AuthProvider } from '@/context/AuthContext'


function App({ Component, pageProps }) {
  return (
    // <SessionProvider session={pageProps.session}>
    <AuthProvider>
      <Component {...pageProps} />
      </AuthProvider>
    // </SessionProvider>
  )
}


export default App