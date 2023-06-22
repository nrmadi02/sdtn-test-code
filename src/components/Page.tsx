import Head from "next/head";
import type { ReactNode } from "react";

interface Props {
  title: string;
  description?: string;
  children: ReactNode;
}

const Page = (
  { title, description = "Test code Sinar Digital Nusantara", children }: Props
) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>{children}</div>
    </>
  );
};

export default Page;
