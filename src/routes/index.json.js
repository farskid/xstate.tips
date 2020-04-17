import readme from "../../data/_readme.json";
const content = JSON.stringify(readme);

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(content);
}
