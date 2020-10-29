const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const RSS = require("rss");
const uuid = require("uuid");

const TIPS_DIR = path.join(process.cwd(), "src/tips");
const HOME_URL = "https://xstate.tips/";
const RSS_FILE = path.join(process.cwd(), "public/feed.xml");

const feed = new RSS({
  title: "XState Tips",
  description:
    "Examples from real life that help you master state machines and statecharts",
  language: "en",
});

function getPathLastModified(path) {
  const stats = fs.statSync(path);
  return stats.mtime;
}

function shouldTriggerRSS() {
  // In case this is the 1st time we generate the feed
  if (!fs.existsSync(RSS_FILE)) {
    return true;
  }

  const feedLastModifiedDate = getPathLastModified(RSS_FILE);

  const allExamplesLastModifiedDate = fs
    .readdirSync(TIPS_DIR)
    .map((dir) => ({ dir }))
    .map((obj) => ({
      ...obj,
      files: fs.readdirSync(path.join(TIPS_DIR, obj.dir)),
    }))
    .reduce((total, current) => {
      return total.concat(
        ...current.files.map(
          (f) =>
            new Date(getPathLastModified(path.join(TIPS_DIR, current.dir, f)))
        )
      );
    }, []);
  const mostRecentExampleLastModifiedDate = allExamplesLastModifiedDate.reduce(
    (recent, current) => (recent.getTime() < current ? current : recent)
  );

  return (
    feedLastModifiedDate.getTime() <=
    mostRecentExampleLastModifiedDate.getTime()
  );
}

function prepareFullContent(tipDirName) {
  const dir = path.join(TIPS_DIR, tipDirName);
  const metadata = require(path.join(dir, "meta.js"));

  return { ...metadata, dir: tipDirName };
}

function collectMetadata() {
  return fs.readdirSync(TIPS_DIR).map(prepareFullContent);
}

function generateAutomaticFeed() {
  if (!shouldTriggerRSS()) {
    console.log(
      chalk.magentaBright(`📰 Nothing new. Skipping the RSS generation`)
    );
    return;
  }

  const tips = collectMetadata();

  tips.forEach((tip) => {
    const {
      meta: { title, description, author, pubDate: date },
      dir,
    } = tip;
    feed.item({
      title,
      description,
      author,
      date,
      guid: uuid.v4(),
      url: path.join(HOME_URL, dir),
    });
  });

  fs.writeFileSync(RSS_FILE, feed.xml({ indent: true }));

  console.log(chalk.green(`📰 Successfully compiled RSS feed!`));
}

generateAutomaticFeed();
