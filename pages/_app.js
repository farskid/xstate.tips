import "../styles/globals.css";
import * as React from "react";
import { useRouter } from "next/router";
import { ExamplesLayout } from "./components/ExamplesLayout";
import useSWR from "swr";
import "./components/themes/dark.scss";

const getLayout = (route) => {
  if (route.includes("/example")) {
    return ExamplesLayout;
  }

  return React.Fragment;
};

function MyApp({ Component, pageProps }) {
  // const router = useRouter();
  // const Layout = getLayout(router.route);
  // const response = useSWR("/api/example", {
  //   fetcher: (...args) => fetch(...args).then((r) => r.json()),
  // });
  return (
    // <Layout examples={response?.data?.examples}>
    <Component {...pageProps} />
    // </Layout>
  );
}

export default MyApp;
