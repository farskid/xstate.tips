const { Remarkable } = require("remarkable");
const MetaRemarkable = require("meta-remarkable");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

const DATA_DIR = path.join(process.cwd(), "data");
const MARKDOWN_DIR = path.join(DATA_DIR, "tips");
const COMPILE_FILE = path.join(DATA_DIR, "_tips.json");

const remarkableConfig = {
  html: false,
  xhtmlOut: true,
  breaks: false,
  typographer: true,
  linkify: true,
};

const metadata = require(`${DATA_DIR}/metadata.json`);

const collectMarkdowns = () => {
  return fs.readdirSync(MARKDOWN_DIR);
};

const saveTips = (tipsJson) => {
  fs.writeFileSync(COMPILE_FILE, JSON.stringify(tipsJson));
};

const slugify = (title) =>
  title
    .toLowerCase()
    .split(" ")
    .join("-")
    .split(/\t/)
    .join("--")
    .split(/<\/?[^>]+>/)
    .join("")
    .split(/[|$&`~=\\\/@+*!?({[\]})<>=.,;:'"^]/) // eslint-disable-line no-useless-escape
    .join("")
    .split(/[。？！，、；：“”【】（）〔〕［］﹃﹄“ ”‘’﹁﹂—…－～《》〈〉「」]/)
    .join("");

const markdownFiles = collectMarkdowns();

const markdownContents = markdownFiles.map((file) => ({
  name: file,
  md: fs.readFileSync(path.join(MARKDOWN_DIR, file)).toString(),
}));

const parser = new MetaRemarkable("full", remarkableConfig);

module.exports.compileTips = function () {
  return markdownContents.map((file) => {
    const { meta, html } = parser.render(file.md);
    const slug = slugify(meta.title);

    return {
      ...meta,
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
