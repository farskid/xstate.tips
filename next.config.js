const { getAllExamples } = require("./examples");

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
        destination: firstExample.href,
        permanent: false,
      },
      { source: "/example", destination: "/", permanent: false },
    ];
  },
});
