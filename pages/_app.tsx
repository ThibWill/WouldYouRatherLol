import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { Alfa_Slab_One } from "next/font/google";

const ASO = Alfa_Slab_One({
  weight: ["400"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${ASO.style.fontFamily};
          }
        `}
      </style>
      <Head>
        <title>Versus LoL</title>
        <meta name="description" content="Would you rather, league of legends" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
