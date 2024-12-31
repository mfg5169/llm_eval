//const { GoogleGenerativeAI } = require("@google/generative-ai");
import dotenv from 'dotenv'
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config({ path: '../.env.local' })

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Explain how AI works";
const x = 3
const result = await model.generateContent(prompt);
console.log(result.response.text());
