import { askGPT, loadPDF } from "./langChainHelper.js";

const file = "Handbook_0700_17_Aug_2021.pdf";
import express from "express";
import cors from "cors";
import fs from "fs";

const init = async () => {
  //const load = await loadPDF(file, directory);

  let question = "Summary the docs";
  let history = "";
  let reply = await askGPT(question, directory, history);

  console.log({ reply });

  history = question + reply;

  question = "what is my name";
  reply = await askGPT(question, directory, history);
  console.log({ reply });
};

var app = express();

app.use(cors());

app.get("/checkIndex", function (req, res, next) {
  fs.readdir("idx", (err, f) => {
    res.json(f);
  });
});
app.get("/askGPT", async function (req, res, next) {
  let question = req.query.question;
  let history = "";
  let indexName = "PDF BOOK";
  const directory = `idx/${indexName}`;

  let reply = {};
  if (question) {
    reply = await askGPT(question, directory, history);
  }
  res.json(reply);
});

app.listen(3000, function () {
  console.log("CORS-enabled web server listening on port 80");
});
