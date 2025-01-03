"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { hadUnsupportedValue } from 'next/dist/build/analysis/get-page-static-info';
import React from 'react'
import { useState } from 'react';
import { model } from '../utils/gemini';//rcfe
import { create_message, anthropic } from '../utils/claude';
import { attachReactRefresh } from 'next/dist/build/webpack-config';
function CustomForm() {

    
    const [FormData, setData] = useState<any>();
    const CallAPI=async(data: any) => {
        try {
            const res = await fetch("/api/athropic", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ prompt }), // Send prompt as JSON
            });
      
            if (res.ok) {
              const data = await res.json();
              console.log(data)
            } else {
              console.error("API call failed:", await res.json());
            }
          } catch (error) {
            console.error("Error calling API:", error);
          } finally {
            //setLoading(false);
        }

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
        //             "text": "Why is the ocean salty?"
        //             }
        //         ]
        //         }
        //     ]
        //     });
        //     console.log(result);
            //model.generateContent(data);
                    //console.log(result.response.text())

        


    }

    const handleInputChange = (event:any)=>{
        console.log("updating")
        const {name,value} = event?.target;
        setData({...FormData, [name]:value})
        
    }
    const onSubmit=(e:any) => {
        e.preventDefault()

        console.log(FormData)
        console.log("hello")

        CallAPI(FormData["prompt"])



        
    }
  return (

    <form className='mt-6' onSubmit={onSubmit}>
        <div>
            {/* <Input></Input> */}
            <label >Ask the AI</label>
            <input onChange={handleInputChange} name="prompt" required/>
        </div>
        <Button type="submit">Submit</Button>
    </form>


  )
}

export default CustomForm