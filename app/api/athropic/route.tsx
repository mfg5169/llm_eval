import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import dotenv from 'dotenv'

// POST request handler
export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();  // Parse the request body
    
    // Fetch the API key from environment variables
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API Key is not set!" }),
        { status: 500 }
      );
    }

    // Initialize the Anthropic client
    const client = new Anthropic();

    // Make the API call to Anthropic
    // const response = await client.messages.create({
    //     model: "claude-3-5-sonnet-20241022",
    //     max_tokens: 1000,
    //     temperature: 0,
    //     system: "Respond only with short poems.",
    //     messages: [
    //         {
    //         "role": "user",
    //         "content": [
    //             {
    //             "type": "text",
    //             "text": prompt
    //             }
    //         ]
    //         }
    //     ]
    //     });

    // Return the response from Anthropic to the client
    return new Response(JSON.stringify({'Name': "Nate"}), { status: 200 });
  } catch (error) {
    console.error("Error calling Anthropic API:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request." }),
      { status: 500 }
    );
  }
}
