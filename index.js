import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

process.env.OPENAI_API_KEY = "2131321";
console.log(process.env.OPENAI_API_KEY);
const chat = new ChatOpenAI({ temperature: 0 });
 