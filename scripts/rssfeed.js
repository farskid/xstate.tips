const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const { escapeHtml } = require("./utils");

const DATA_DIR = path.join(process.cwd(), "data");
const HOME_URL = "https://xstate.tips/";
const RSS_FILE = path.join(process.cwd(), "static/feed.xml");
const metadata = require(`${DATA_DIR}/metadata.json`);

module.exports.generateFeed = function (tips) {
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
    )}</description><pubDate>${
      tip.pubDate || pubDateFallback.toUTCString()
    }</pubDate><link>${HOME_URL}${
      tip.slug
    }</link><guid isPermaLink="true">${HOME_URL}${tip.slug}</guid></item>`;
  }

  feedXML += "\n</channel>\n</rss>";

  fs.writeFileSync(RSS_FILE, feedXML);
  console.log(chalk.green(`📰 Successfully compiled RSS feed!`));
};
