const fs = require("fs");
const h = fs.readFileSync(__dirname + "/chua-pho-giac.html", "utf8");
const t = h
  .replace(/<script[\s\S]*?<\/script>/gi, "")
  .replace(/<style[\s\S]*?<\/style>/gi, "")
  .replace(/data:image[^"']+/g, "[IMG]")
  .replace(/\s+/g, " ");
for (const id of ["su-kien", "tin-tuc", "gioi-thieu", "lien-he", "hero"]) {
  const key = id === "hero" ? 'class="hero' : 'id="' + id + '"';
  const i = t.indexOf(key);
  console.log("\n=== " + id + " ===\n" + t.slice(i, i + 3500));
}
