import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import CustomForm from "./_components/CustomForm";

export default function Home() {

  // const [responses, setResponses] = useState([]);

  // const getResponse =  async () => {
  //   try {
  //     // Make an API call (example API URL)
  //     const res = await fetch('https://api.example.com/data');
  //     const data = await res.json();

  //     // Append the response to the current responses state
  //     setResponses(prevResponses => [...prevResponses, data]);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  console.log(process.env.NEXT_GEMINI_API_KEY)
  return (
    <div>
      <CustomForm></CustomForm>

    </div>
  );
}
