import Page from "@/components/Page";
import Layout from "@/layout";
import { type ReactNode } from "react";

const Home = () => {
  return (
    <Page title="Home">
      <div className="w-full p-5">
        <h1 className="font-bold text-center text-[40px]">Selamat Datang di Sinar Digital Nusantara</h1>
      </div>
    </Page>
  );
};

Home.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default Home;
