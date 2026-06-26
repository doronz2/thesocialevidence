import { User, Article } from "../src/store.mjs";
import fs from "fs";

async function main() {
  for (let i = 1; i <= 6547; i++) {
    const { title, blocks } = JSON.parse(fs.readFileSync(`data/${i}.json`).toString());
    const lines = [];
    for (const block of blocks) {
      if (block.type == "paragraph") {
        lines.push(block.data.text.trim());
        lines.push("");
      } else if (block.type == "image") {
        lines.push(`![${block.data.caption}](${block.data.file.url})`);
        lines.push("");
      } else {
        console.log("unknown block", JSON.stringify(block.type, null, 2));
      }
    }
    const text = lines.join("\n").trim();
    const article = new Article({
      author: "doronz@gmail.com",
      title,
      text,
      published: true,
    });
    await article.save();
    console.log(article._id, i);
  }
}
main();
