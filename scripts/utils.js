module.exports.slugify = function (title) {
  return title
    .toLowerCase()
    .split(" ")
    .join("-")
    .split(/\t/)
    .join("--")
    .split(/<\/?[^>]+>/)
    .join("")
    .split(/[|$&`~=\\\/@+*!?({[\]})<>=.,;:'"^]/) // eslint-disable-line no-useless-escape
    .join("")
    .split(/[。？！，、；：“”【】（）〔〕［］﹃﹄“ ”‘’﹁﹂—…－～《》〈〉「」]/)
    .join("");
};

module.exports.escapeHtml = function escapeHtml(raw) {
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};
