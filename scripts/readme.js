const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { render } = require("./markdown");

const README_FILE = path.join(process.cwd(), "README.md");
const README_HTML_FILE = path.join(process.cwd(), "data/_readme.json");

module.exports.compileReadme = function () {
  const readmeMd = fs.readFileSync(README_FILE).toString();
  const readmeHtml = render(readmeMd);
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
