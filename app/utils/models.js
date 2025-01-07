const { GoogleGenerativeAI } = require("@google/generative-ai");
const Anthropic = require("@anthropic-ai/sdk");
require("dotenv").config({ path: ".env.local" }); // Load environment variables

// const fs = require("fs");
// const path = require("path");

// // Define the path you want to check
// const dirPath = path.join(__dirname, "../../"); // Adjust the path as needed

// // Read the directory and print the files
// fs.readdir(dirPath, (err, files) => {
//   if (err) {
//     console.error("Error reading directory:", err);
//   } else {
//     console.log("Files in the directory:", files);
//   }
// });

// Initialize Gemini and Anthropic clients

console.log("GEMINI KEY: " + process.env.NEXT_PUBLIC_GEMINI_API_KEY)
const geminiClient = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const anthropicClient = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Dictionary mapping model names to corresponding clients and configurations
const Models = {
  "gemini-1.5-flash": {
    client: geminiClient,
    method: async (message) => {
      const model = geminiClient.getGenerativeModel({ model: "gemini-1.5-flash" });
      const resp = await model.generateContent(message);
      return resp.response.text()
    },
  },
  "claude-3-5-sonnet-20241022": {
    client: anthropicClient,
    method: async (message) => {
      const msg =  await anthropicClient.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1000,
        temperature: 0,
        //system: "Respond only with short poems.",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: message,
              },
            ],
          },
        ],
      });
      return msg.content[0].text
    },
  },
};

module.exports = Models;