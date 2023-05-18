import { askGPT, loadPDF } from "./langChainHelper.js";
const directory = "idx/3";
const file = "Handbook_0700_17_Aug_2021.pdf";

const init = async () => {
  const load = await loadPDF(file, directory);
  let question = "my name is asa choi";
  let history = "";
  let reply = await askGPT(question, directory, history);

  console.log({ reply });

  history = question + reply;

  question = "what is my name";
  reply = await askGPT(question, directory, history);
  console.log({ reply });
};

init();
