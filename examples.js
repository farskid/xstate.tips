const fs = require("fs");
const path = require("path");

function slugToTitle(slug = "") {
  return slug.split("-").join(" ");
}

module.exports.getAllExamples = function getAllExamples() {
  const examples = fs.readdirSync(path.join(process.cwd(), "pages/example"));
  return examples
    .map((ex) => path.basename(ex, path.extname(ex)))
    .map((ex) => ({
      slug: ex,
      href: path.join("/example/", ex),
      title: slugToTitle(ex),
    }));
};
