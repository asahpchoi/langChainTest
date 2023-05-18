import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export const loadPDF = async (file, directory) => {
  const loader = new PDFLoader(file);
  const docs = await loader.load();
  /* Create the vectorstore */
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());

  return await vectorStore.save(directory);
};

export const askGPT = async (question, directory, chat_history) => {
  /* Initialize the LLM to use to answer the question */
  const model = new ChatOpenAI({});
  /* Load in the file we want to do question answering over */

  const vectorStore = await HNSWLib.load(directory, new OpenAIEmbeddings());

  /* Create the chain */
  console.time("chain");
  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever()
  );
  /* Ask it a question */
  const res = await chain.call({ question, chat_history });

  console.timeEnd("chain");
  /* Ask it a follow up question */

  return res.text;

  /*const followUpRes = await chain.call({
    question: "What was the result?",
    chat_history: chatHistory,
  });
  console.log(followUpRes);
  */
};
