const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

const TIPS_DIR = path.join(process.cwd(), "src/tips");
const EXAMPLES_DIR = path.join(
  process.cwd(),
  "pages/example"
);

function createNewTip() {
  const args = process.argv.slice(2);
  const titleIndex = args.findIndex((a) => a === "--title");
  let tipTitle = args[titleIndex + 1];

  if (!tipTitle) {
    console.log(
      chalk.red(
        'No tip title provided. example: `yarn new-tip --title "my new tip title"`'
      )
    );
    process.exit(1);
  }

  tipTitle = sluggify(tipTitle);

  //   Create tip dir under src/tips
  fs.mkdirSync(path.join(TIPS_DIR, tipTitle));

  //   Create meta.js under src/tips/[tipTitle]
  fs.writeFileSync(
    path.join(TIPS_DIR, tipTitle, "meta.js"),
    `module.exports.meta = {title: "",description:"",pubDate: "",author: "",};`,
    {
      encoding: "utf-8",
    }
  );

  //   Create index.mdx under src/tips/[tipTitle]
  fs.writeFileSync(
    path.join(TIPS_DIR, tipTitle, "index.mdx"),
    `import { Tip } from "components/Tip";
import { meta } from "./meta";
export default ({ children }) => (
  <Tip meta={meta}>{children}</Tip>
);

## YOUR_TITLE

WRITE_SOME_DESCRIPTION.`,
    {
      encoding: "utf-8",
    }
  );

  // Create [tipTitle].js under pages/example
  fs.writeFileSync(
    path.join(EXAMPLES_DIR, `${tipTitle}.js`),
    `export { default } from "tips/${tipTitle}/index.mdx";`,
    {
      encoding: "utf-8",
    }
  );
}

createNewTip();

function sluggify(title = "") {
  return title.toLocaleLowerCase().split(" ").join("-");
}
