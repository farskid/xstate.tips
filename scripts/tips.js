const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const { renderWithMeta } = require("./markdown");
const { slugify } = require("./utils");

const DATA_DIR = path.join(process.cwd(), "data");
const MARKDOWN_DIR = path.join(DATA_DIR, "tips");
const COMPILE_FILE = path.join(DATA_DIR, "_tips.json");

const metadata = require(`${DATA_DIR}/metadata.json`);

const collectMarkdowns = () => {
  return fs.readdirSync(MARKDOWN_DIR);
};

const saveTips = (tipsJson) => {
  fs.writeFileSync(COMPILE_FILE, JSON.stringify(tipsJson));
};

const markdownFiles = collectMarkdowns();

const markdownContents = markdownFiles.map((file) => ({
  name: file,
  md: fs.readFileSync(path.join(MARKDOWN_DIR, file)).toString(),
}));

module.exports.compileTips = function () {
  return markdownContents.map((file) => {
    const { meta, html } = renderWithMeta(file.md);
    const slug = slugify(meta.title);

    return {
      ...meta,
      tags: meta.tags.split(",").map((m) => m.trim()),
      html,
      slug,
    };
  });
};

module.exports.saveTips = function (compiledContents) {
  saveTips(compiledContents);
  console.log(
    chalk.green(
      `✔ Successfully compiled tips to -> ${path.relative(
        process.cwd(),
        COMPILE_FILE
      )}`
    )
  );
};
