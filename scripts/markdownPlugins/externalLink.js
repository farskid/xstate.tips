const { escapeHtml } = require("../utils");

function isExternalLink(link, domain) {
  return !link.includes(domain);
}

module.exports = function ExternalLink(domain) {
  if (!domain) {
    throw Error("missing domain in externalLink plugin");
  }

  return function (remarkable) {
    const originalOpen = remarkable.renderer.rules.link_open;

    remarkable.renderer.rules.link_open = function (tokens, idx, options = {}) {
      const link = tokens[idx];
      const isExternal = isExternalLink(link.href, domain);

      if (isExternal) {
        return `<a rel="noopener noreferrer" target="_blank" href="${escapeHtml(
          link.href
        )}" title="${escapeHtml(link.title || link.href)}">`;
      }

      return originalOpen(tokens, idx, options);
    };
  };
};
