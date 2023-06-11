import '@/styles/globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { SessionProvider } from 'next-auth/react'

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