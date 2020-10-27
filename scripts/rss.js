const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const RSS = require("rss");
const uuid = require("uuid");

const feed = new RSS({
  title: "XState Tips",
  description:
    "Examples from real life that help you master state machines and statecharts",
  language: "en",
});

const DATA_DIR = path.join(process.cwd(), "pages/example");
const HOME_URL = "https://xstate.tips/";
const RSS_FILE = path.join(process.cwd(), "public/feed.xml");

function prepareFullContent(exampleDir) {
  const metadata = require(path.join(exampleDir, "meta.js"));

  return JSON.parse(JSON.stringify(metadata));
}

function collectMetadata() {
  return fs
    .readdirSync(DATA_DIR)
    .map((fileName) => prepareFullContent(path.join(DATA_DIR, fileName)));
}

function generateAutomaticFeed() {
  const tips = collectMetadata();

  tips.forEach((tip) => {
    const { title, description, author, pubDate: date, url } = tip.meta;
    feed.item({
      title,
      description,
      author,
      date,
      guid: uuid.v4(),
      url: path.join(HOME_URL, url),
    });
  });

  fs.writeFileSync(RSS_FILE, feed.xml({ indent: true }));

  console.log(chalk.green(`📰 Successfully compiled RSS feed!`));
}

generateAutomaticFeed();
