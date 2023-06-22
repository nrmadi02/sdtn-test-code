import { BaseButton } from "@/components/Button";
import Page from "@/components/Page";
import Layout from "@/layout";
import { useRouter } from "next/router";
import { type ReactNode } from "react";

const LandingPage = () => {
  const router = useRouter()
  return (
    <Page title="Home">
      <div className="container mx-auto pt-10 px-5">
        <h1 className="font-bold">Selamat Datang di Test Code Sinar Digital Nusantara</h1>
        <p>by: Nur Ahmadi</p>
        <BaseButton onClick={() => {
          router.push('/dashboard').catch(_ => console.log("err router..."))
        }} className="mt-5" variant="primary">Dashboard</BaseButton>
      </div>
    </Page>
  );
}

LandingPage.getLayout = (page: ReactNode) => {
  return <Layout variant="main">{page}</Layout>;
};

export default LandingPage;