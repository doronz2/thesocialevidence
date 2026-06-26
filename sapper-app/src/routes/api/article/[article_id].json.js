import { Article } from "../../../store.mjs";
import * as MarkdownIt from "markdown-it";

const md = new MarkdownIt({ linkify: true, html: true });

export async function get(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  const article = { ...(await Article.findById(req.params.article_id))._doc };
  article.id = article._id;
  delete article._id;
  delete article.__v;
  article.html = md.render(article.text);

  res.end(JSON.stringify(article, null, 2));
}

export async function post(req, res) {
  const article = await Article.findById(req.params.article_id);
  if (typeof req.body.published !== "undefined") {
    article.published = req.body.published; 
  }
  if (typeof req.body.text !== "undefined") {
    article.text = req.body.text;
  }
  await article.save();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ id: article._id }, null, 2));
}
