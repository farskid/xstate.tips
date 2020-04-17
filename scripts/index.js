const { generateFeed } = require("./rssfeed");
const tips = require("./tips");
const { compileReadme } = require("./readme");

const { saveTips, compileTips } = tips;

const compiledTips = compileTips();

saveTips(compiledTips);
generateFeed(compiledTips);
compileReadme();
