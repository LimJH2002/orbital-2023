import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import Layout from "./layout";

function App({ Component, pageProps }) {
  const auth = getAuth();
  const { pathname } = useRouter();
  return (
    // <SessionProvider session={pageProps.session}>
    <AuthProvider>
      {pathname !== "/login" &&
      pathname !== "/register" &&
      pathname !== "/intro" &&
      pathname !== "/intro2" &&
      pathname !== "/landing" ? (
        <Layout auth={auth}>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </AuthProvider>
    // </SessionProvider>
  );
}

export default App;
