const { Remarkable } = require("remarkable");
const MetaRemarkable = require("meta-remarkable");
const { linkify } = require("remarkable/linkify");
const ExternalLinkPlugin = require("./markdownPlugins/externalLink");

const remarkableConfig = {
  html: true,
  xhtmlOut: true,
  breaks: false,
  typographer: true,
  linkify: true,
};

module.exports.render = function (markdown, config = {}) {
  const options = Object.assign({}, remarkableConfig, config);
  let parser = new Remarkable("full", options);

  if (options.linkify) {
    parser = parser.use(linkify);
  }

  parser = parser.use(ExternalLinkPlugin("xstate.tips"));

  return parser.render(markdown);
};

module.exports.renderWithMeta = function (markdown, config = {}) {
  const options = Object.assign({}, remarkableConfig, config);
  const parser = new MetaRemarkable("full", options);

  return parser.render(markdown);
};