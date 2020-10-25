// const { getAllExamples } = require("./pages/api/example");
const { getAllExamples } = require("./examples");
const path = require("path");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

const examples = getAllExamples();
const firstExample = examples[0];

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "md", "mdx"],
  redirects() {
    return [
      {
        source: "/",
        destination: path.join("/example/", firstExample.slug),
        permanent: false,
      },
      { source: "/example", destination: "/", permanent: false },
    ];
  },
});
