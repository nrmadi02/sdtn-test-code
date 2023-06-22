import Page from "@/components/Page";
import Layout from "@/layout";
import { type ReactNode } from "react";

const LandingPage = () => {
  return (
    <Page title="Home">
      <p>test</p>
    </Page>
  );
}

LandingPage.getLayout = (page: ReactNode) => {
  return <Layout variant="main">{page}</Layout>;
};

export default LandingPage;