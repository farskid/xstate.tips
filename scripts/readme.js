const { Remarkable } = require("remarkable");
const { linkify } = require("remarkable/linkify");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const README_FILE = path.join(process.cwd(), "README.md");
const README_HTML_FILE = path.join(process.cwd(), "data/_readme.json");

const remarkableConfig = {
  html: true,
  xhtmlOut: true,
  breaks: false,
  typographer: true,
};

module.exports.compileReadme = function () {
  const readmeMd = fs.readFileSync(README_FILE).toString();
  const readmeHtml = new Remarkable("full", remarkableConfig)
    .use(linkify)
    .render(readmeMd);
  fs.writeFileSync(README_HTML_FILE, JSON.stringify({ html: readmeHtml }));
  console.log(
    chalk.green(
      `✔ Successfully compiled README.md to -> ${path.relative(
        process.cwd(),
        README_HTML_FILE
      )}`
    )
  );
};
