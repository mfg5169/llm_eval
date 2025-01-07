//const { GoogleGenerativeAI } = require("@google/generative-ai");
//import dotenv from 'dotenv'
import { GoogleGenerativeAI } from '@google/generative-ai';

const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY!

const genAI = new GoogleGenerativeAI(key);
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Explain how AI works";
//const result = await model.generateContent(prompt);
//console.log(result.response.text());



