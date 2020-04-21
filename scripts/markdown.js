const { Remarkable } = require("remarkable");
const MetaRemarkable = require("meta-remarkable");
const { linkify: linkifyPlugin } = require("remarkable/linkify");
const ExternalLinkPlugin = require("./markdownPlugins/externalLink");

const remarkableConfig = {
  html: true,
  xhtmlOut: true,
  breaks: false,
  typographer: true,
  linkify: true,
};

module.exports.render = function (markdown, config = {}) {
  const { linkify, ...options } = Object.assign({}, remarkableConfig, config);
  let parser = new Remarkable("full", options);

  if (linkify) {
    parser = parser.use(linkifyPlugin);
  }

  parser = parser.use(ExternalLinkPlugin("xstate.tips"));

  return parser.render(markdown);
};

module.exports.renderWithMeta = function (markdown, config = {}) {
  const options = Object.assign({}, remarkableConfig, config);
  const parser = new MetaRemarkable("full", options);

  return parser.render(markdown);
};
