// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require("fs");
const path = require("path");

function slugToTitle(slug = "") {
  return slug.split("-").join(" ");
}

export function getAllExamples() {
  const examples = fs.readdirSync(
    path.join(
      process.cwd(),
      "pages/example"
    )
  );
  return examples
    .map((ex) =>
      path.basename(
        ex,
        path.extname(ex)
      )
    )
    .map((ex) => ({
      slug: ex,
      title: slugToTitle(ex),
    }));
}

export default (_, res) => {
  res.status(200).json({
    examples: getAllExamples(),
  });
};
