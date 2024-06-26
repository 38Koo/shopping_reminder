import Head from "next/head";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { Box } from "@yamada-ui/react";
import { Header } from "../Header/component";
import { useCustomMediaQuery } from "../../hooks/useMediaQuery";

const inter = Inter({ subsets: ["latin"] });

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isTopPage = router.asPath === "/";
  const { isSp } = useCustomMediaQuery();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box overflow="hidden">
          {!isTopPage && <Header />}
          <Box pt="8rem" pb="2rem" px={isSp ? "10px" : "20%"}>
            {children}
          </Box>
        </Box>
      </main>
    </>
  );
};
