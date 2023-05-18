import { askGPT, loadPDF } from "./langChainHelper.js";
const directory = "idx/3";
const file = "Handbook_0700_17_Aug_2021.pdf";
import express from "express";
import cors from "cors";

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

app.get("/", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.listen(3000, function () {
  console.log("CORS-enabled web server listening on port 80");
});
