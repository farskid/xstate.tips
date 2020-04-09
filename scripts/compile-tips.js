const { Remarkable } = require("remarkable");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

const DATA_DIR = path.join(process.cwd(), "data");
const MARKDOWN_DIR = path.join(DATA_DIR, "tips");
const COMPILE_FILE = path.join(DATA_DIR, "_tips.json");
const remarkableConfig = {
  html: true,
  xhtmlOut: true,
  breaks: false,
  typographer: true,
};

const collectMarkdowns = () => {
  return fs.readdirSync(MARKDOWN_DIR);
};

const saveTips = (tipsJson) => {
  fs.writeFileSync(COMPILE_FILE, JSON.stringify(tipsJson));
};

const extractTitle = (file, html) => {
  const PATTERN = /<h1>(.+)<\/h1>/gm;
  const matched = PATTERN.exec(html);
  if (!matched) {
    throw Error(
      `file [${file}] does NOT have a title. Make sure the markdown content starts with an H1`
    );
  }
  return matched[1];
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

// Main
(function main() {
  const markdownFiles = collectMarkdowns();
  const markdownContents = markdownFiles.map((file) => ({
    name: file,
    md: fs.readFileSync(path.join(MARKDOWN_DIR, file)).toString(),
  }));

  const compiledContents = markdownContents.map((file) => {
    const html = new Remarkable(remarkableConfig).render(file.md);
    const title = extractTitle(file, html);
    return {
      ...file,
      html,
      slug: slugify(title),
      title,
    };
  });
  console.log(
    chalk.green(
      `✔ Successfully compiled tips to -> ${path.relative(
        process.cwd(),
        COMPILE_FILE
      )}`
    )
  );
  saveTips(compiledContents);
})();
