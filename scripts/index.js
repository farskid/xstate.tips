const { generateFeed } = require("./rssfeed");
const tips = require("./tips");
const { saveTips, compileTips } = tips;

const compiledTips = compileTips();

saveTips(compiledTips);
generateFeed(compiledTips);
