import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "./Components/NavBar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <style jsx global>
        {`
          a {
            color: white;
          }
        `}
      </style>
    </>
  );
}

export default MyApp;
