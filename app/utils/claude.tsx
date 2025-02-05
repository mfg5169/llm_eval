import Anthropic from "@anthropic-ai/sdk";
import dotenv from 'dotenv'

// Load environment variables from .env.local
//dotenv.config({ path: '../.env.local' })

const key = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY!
export const anthropic = new Anthropic({  apiKey: key,
    dangerouslyAllowBrowser: true, });

//https://docs.anthropic.com/en/api/creating-message-batches

export function create_message(message: string){
    return {
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1000,
        temperature: 0,
        system: "Respond only with short poems.",
        messages: [
            {
            "role": "user",
            "content": [
                {
                "type": "text",
                "text": message
                }
            ]
            }
        ]
    }

}
const msg = await anthropic.messages.create({
model: "claude-3-5-sonnet-20241022",
max_tokens: 1000,
temperature: 0,
system: "Respond only with short poems.",
messages: [
    {
    "role": "user",
    "content": [
        {
        "type": "text",
        "text": "Why is the ocean salty?"
        }
    ]
    }
]
});
console.log(msg);

