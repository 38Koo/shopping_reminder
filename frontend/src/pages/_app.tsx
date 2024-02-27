import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UIProvider } from "@yamada-ui/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Layout } from "../components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider
      {...pageProps}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <UIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UIProvider>
    </ClerkProvider>
  );
}
