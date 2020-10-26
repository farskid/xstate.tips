const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

function getAuthors(author) {
  if (Array.isArray(author)) {
    const rendered = author.reduce(
      (authors, currentAuthor) =>
        authors.concat(`<author><name>${currentAuthor}</name></author>\n`),
      ""
    );
    return rendered;
  }
  return `<author><name>${author}</name></author>\n`;
}

const DATA_DIR = path.join(process.cwd(), "data");
const HOME_URL = "https://xstate.tips/";
const RSS_FILE = path.join(process.cwd(), "public/feed.xml");

function generateFeed() {
  const tips = require(path.join(DATA_DIR, "posts.json"));
  console.log({ tips });
  let feedXML = `<?xml version="1.0" encoding="UTF-8"?>
          <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
          <channel>
          <title>XState Tips</title>
          <description>Examples from real life that help you master state machines</description>
          <link>${HOME_URL}</link>
          <atom:link href="${HOME_URL}feed.xml" rel="self" type="application/rss+xml" />`;

  const pubDateFallback = new Date();

  for (const tip of tips) {
    feedXML += `\n<item><title>${tip.title}</title><description>${
      tip.description
    }</description>
      ${getAuthors(tip.author)}
      <pubDate>${
        tip.pubDate || pubDateFallback.toUTCString()
      }</pubDate><link>${HOME_URL}examples/${
      tip.slug
    }</link><guid isPermaLink="true">${HOME_URL}examples/${
      tip.slug
    }</guid></item>`;
  }

  feedXML += "\n</channel>\n</rss>";

  fs.writeFileSync(RSS_FILE, feedXML);
  console.log(chalk.green(`📰 Successfully compiled RSS feed!`));
}

generateFeed();
