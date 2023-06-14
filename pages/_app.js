import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Sidebar from "@/components/sidebar";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";

function App({ Component, pageProps }) {
  const auth = getAuth();
  const { pathname } = useRouter();
  return (
    // <SessionProvider session={pageProps.session}>
    <AuthProvider>
      {pathname !== "/login" && pathname !== "/register" ? (
        <Sidebar auth={auth}>
          <Component {...pageProps} />
        </Sidebar>
      ) : (
        <Component {...pageProps} />
      )}
    </AuthProvider>
    // </SessionProvider>
  );
}

export default App;
