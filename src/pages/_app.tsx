import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/navbar/Navbar";
import { Notify } from "../utils/notify/Notify";
import { Inter } from "@next/font/google";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Navbar />
      <Notify />
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </AuthProvider>
  );
}

export default MyApp;
