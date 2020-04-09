import tips from "./_tips.js";

const contents = JSON.stringify(tips[0]);

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(contents);
}
