import "../styles/normalize.css";
import "../styles/globals.css";
import * as React from "react";
import { useRouter } from "next/router";
import { ExamplesLayout } from "../components/ExamplesLayout";
import useSWR from "swr";
import { MDXProvider } from "@mdx-js/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import style from "react-syntax-highlighter/dist/cjs/styles/prism/pojoaque";
import "../components/xstate-viz/themes/dark.scss";

style.comment = {
  ...style.comment,
  color: "hsl(194.5, 14.1%, 100%)",
};
const mdxComponents = {
  pre: (props) => props.children,
  code: (props) => {
    const { className = "" } = props;
    const language = className.replace("language-", "");
    return (
      <SyntaxHighlighter
        className={className}
        language={language}
        style={style}
        customStyle={{
          background: "#151515",
          border: "none",
          boxShadow: "rgba(17, 17, 17, 0.65) 4px 0px 8px 1px",
        }}
        {...props}
      />
    );
  },
};

// For now, we only have examples layout but this scales to adding new layouts dynamically for future cases.
const getLayout = (route) => {
  return ExamplesLayout;
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const Layout = getLayout(router.route);
  const response = useSWR("/api/example", {
    fetcher: (...args) => fetch(...args).then((r) => r.json()),
  });

  const pagesList = React.useMemo(
    () =>
      [
        {
          slug: "contributing",
          href: "/contributing",
          title: "Contributing Guide",
        },
      ].concat(response?.data?.examples || []),
    [response.data]
  );
  return (
    <MDXProvider components={mdxComponents}>
      <Layout examples={pagesList}>
        <Component />
      </Layout>
    </MDXProvider>
  );
}

export default MyApp;
