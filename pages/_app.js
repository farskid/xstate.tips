import "../styles/normalize.css";
import "../styles/globals.css";
import * as React from "react";
import { useRouter } from "next/router";
import { ExamplesLayout } from "components/ExamplesLayout";
import useSWR from "swr";
import { MDXProvider } from "@mdx-js/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import style from "react-syntax-highlighter/dist/cjs/styles/prism/pojoaque";
import "components/xstate-viz/themes/dark.scss";
import * as prettier from "prettier";
import babelParser from "prettier/parser-babel";

function formatCodeSnippet(code) {
  return prettier
    .format(code, {
      parser: "babel",
      plugins: [babelParser],
      semi: true,
    })
    .trim();
}

const mdxComponents = {
  pre: (props) => {
    return {
      ...props.children,
      props: {
        ...props.children.props,
        children: (() => {
          const code = props.children.props.children;
          try {
            return formatCodeSnippet(code);
          } catch(_) {
            return code;
          }
        })()
      },
    };
  },
  code: (props) => {
    const { className = "" } = props;
    const language = className.replace("language-", "");
    return (
      <SyntaxHighlighter
        className={className}
        language={language}
        style={style}
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
