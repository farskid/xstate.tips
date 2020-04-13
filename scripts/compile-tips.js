const { Remarkable } = require("remarkable");
const MetaRemarkable = require("meta-remarkable");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

const HOME_URL = "https://xstate.tips/";
const DATA_DIR = path.join(process.cwd(), "data");
const MARKDOWN_DIR = path.join(DATA_DIR, "tips");
const COMPILE_FILE = path.join(DATA_DIR, "_tips.json");
const RSS_FILE = path.join(process.cwd(), "static/feed.xml");
const remarkableConfig = {
  html: false,
  xhtmlOut: true,
  breaks: false,
  typographer: true,
  linkify: true
};

const metadata = JSON.parse(fs.readFileSync(`${DATA_DIR}/metadata.json`));
const collectMarkdowns = () => {
  return fs.readdirSync(MARKDOWN_DIR);
};

const saveTips = tipsJson => {
  fs.writeFileSync(COMPILE_FILE, JSON.stringify(tipsJson));
};

const slugify = title =>
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
const markdownContents = markdownFiles.map(file => ({
  name: file,
  md: fs.readFileSync(path.join(MARKDOWN_DIR, file)).toString()
}));

const parser = new MetaRemarkable("full", remarkableConfig);

// Main
(function main() {
  const compiledContents = markdownContents.map(file => {
    const { meta, html } = parser.render(file.md);
    const slug = slugify(meta.title);

    return {
      ...meta,
      html,
      slug
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
  generateFeed(compiledContents);
})();

function generateFeed(tips) {
  let feedXML = `<?xml version="1.0" encoding="UTF-8"?>
      <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
      <title>${metadata.site.title}</title>
      <description>${metadata.site.description}</description>
      <link>${HOME_URL}</link>
      <atom:link href="${HOME_URL}feed.xml" rel="self" type="application/rss+xml" />`;

  const pubDateFallback = new Date();

  for (const tip of tips) {
    feedXML += `\n<item><title>${tip.title}</title><description>${escapeHtml(
      tip.html
    )}</description><pubDate>${tip.pubDate ||
      pubDateFallback.toUTCString()}</pubDate><link>${HOME_URL}${
      tip.slug
    }</link><guid isPermaLink="true">${HOME_URL}${tip.slug}</guid></item>`;
  }

  feedXML += "\n</channel>\n</rss>";
  fs.writeFileSync(RSS_FILE, feedXML);
  console.log(chalk.green(`📰Successfully compiled RSS feed!`));
}

function escapeHtml(raw) {
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
