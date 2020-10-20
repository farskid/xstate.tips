const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "md", "mdx"],
  redirects() {
    return [{ source: "/example", destination: "/", permanent: false }];
  },
});
