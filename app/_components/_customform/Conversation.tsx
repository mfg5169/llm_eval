import React from 'react'
// Define types for the conversation entries
interface ConversationEntry {
    prompt: string;
    response: string; // Adjust this type based on the response structure (e.g., string or some other type)
}

interface ConversationProps {
    conversation: ConversationEntry[];
}
function Conversation({conversation}: ConversationProps) {


//   const convo = [{message: "hello", response: "Hi, how are you"}, {message: "I'm good just ate a bagel", response: "was the bagel good?"}]
  return (
    <div>
      {conversation.map((entry, index) => (
        <div key={index}> 
          <p>{entry.prompt}</p>
          <p>{entry.response}</p>
        </div>
      ))}
    </div>
  )
}
export default Conversation