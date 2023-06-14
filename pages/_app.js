import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import SidebarLayout from "@/components/sidebar-layout";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";

function App({ Component, pageProps }) {
  const auth = getAuth();
  const { pathname } = useRouter();
  return (
    // <SessionProvider session={pageProps.session}>
    <AuthProvider>
      {pathname !== "/login" && pathname !== "/register" ? (
        <SidebarLayout auth={auth}>
          <Component {...pageProps} />
        </SidebarLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </AuthProvider>
    // </SessionProvider>
  );
}

export default App;
