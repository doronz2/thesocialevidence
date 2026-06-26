import { Article } from "../../store.mjs";
import moment from "moment";

const LIMIT = 100;

export async function get(req, res) {
  let articles;
  if (req.query.email) {
    articles = await Article.find({
      // published: true,
      author: req.query.email,
    })
      .limit(LIMIT)
      .exec();
  } else if (req.query.q) {
    const q0 = req.query.q.trim();
    const q1 = q0.replace(/#[a-zA-Z0-9]+/g, (m) => '"' + m + '"');
    articles = await Article.find({
      published: true,
      $text: {
        $search: q1,
      },
    })
      .limit(LIMIT)
      .exec();
  } else {
    articles = await Article.find(
      {
        published: true,
      },
      "author title createdAt",
      { sort: "-createdAt" }
    ).limit(LIMIT);
  }
  articles = articles.map((article) => ({
    id: article._id,
    author: article.author,
    title: article.title,
    createdAtFromNow: moment(article.createdAt).fromNow(),
    createdAt: article.createdAt,
  }));
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(articles));
}

export async function post(req, res) {
  const article = new Article({
    author: req.body.author,
    title: req.body.title,
    text: defaultText(req.body.title),
  });
  await article.save();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ id: article._id }));
}

const defaultText = (title) => `\
# ${title}

This is how you embed a link:

- [Google](https://www.google.com);
- Or just https://www.google.com.

This is how you embed an image:

![](http://thesocialevidence.appspot.com/placeholder/placeholder.jpg);
`;
