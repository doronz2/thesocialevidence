const exphbs = require("express-handlebars");//similar to ejs view engine
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL);

const QuoteSchema = mongoose.Schema(
  {
    url: String,
    comment: String,
    range: String,
  },
  { timestamps: true }
);
const Quote = mongoose.model("Quote", QuoteSchema);

const app = express();
app.locals.pretty = true;
app.set("json spaces", 2);
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
const port = process.env.PORT || 8080;
app.listen(port, () => console.log("http://localhost:" + port));

// app.use(express.static("./static"));

app.use(cors());
app.use(bodyparser.json());

app.get("/api/quotes", async (req, res) => {//grab all quoted from the same page (url)
  const quotes = await Quote.find({ url: req.query.url });
  res.json(quotes);
});

app.post("/api/quotes", async (req, res) => {
  const { url, comment, range } = req.body;
  const quote = new Quote({
    url,
    comment,
    range: JSON.stringify(range),
  });
  await quote.save();
  res.json(quote);
});
