import type { AppProps } from "next/app";
import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/navbar/Navbar";
import { Notify } from "../utils/notify/Notify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Navbar />
      <Notify />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
