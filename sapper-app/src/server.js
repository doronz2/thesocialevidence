import * as sapper from "@sapper/server";
const { json } = require("body-parser");
import compression from "compression";
import polka from "polka";
import sirv from "sirv";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";
//setting polka configuration (like express.use) 
polka()
  .use(compression({ threshold: 0 }))
  .use(sirv("static", { dev }))
  .use(json())
  .use(sapper.middleware())
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
