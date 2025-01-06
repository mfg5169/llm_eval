"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { hadUnsupportedValue } from 'next/dist/build/analysis/get-page-static-info';
import React from 'react'
import { useState } from 'react';
import { model } from '../../utils/gemini';//rcfe
import { create_message, anthropic } from '../../utils/claude';
import { attachReactRefresh } from 'next/dist/build/webpack-config';
import Conversation from './Conversation';

function CustomForm({Tab}: {Tab:string}) {

    console.log(JSON.parse(localStorage.getItem(Tab)|| "[]"))
    const [FormData, setData] = useState<any>('');
    const [convo, setConvo] = useState<{ prompt: any; response: any }[]>([]);
    const CallAPI=async(data: any) => {
        try {
            const res = await fetch("/api/ath", {
              method: "GET", //change to post 
              headers: {
                "Content-Type": "application/json",
              }//,
              //body: JSON.stringify({ prompt }), // Send prompt as JSON
            });
      
            if (res.ok) {
              const data = await res.json();
              console.log(data)

              return data
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
        
        const {name, value} = event?.target;
        setData(value)
        console.log(name)
        
    }

    const onSubmit=(e:any) => {
        e.preventDefault()
        console.log(FormData)
        console.log("hello")
        //const res = await CallAPI(FormData["prompt"])
        const res = "Yes I recieved the message"
        setConvo((prevConversation) => [...prevConversation, { prompt: FormData, response: res }])
        setData('')
        



        
    }
  return (
    <div className='h-[90vh]'>
        <div>
            <Conversation
            conversation={convo}/>
        </div>
        <form className='mt-6 flex w-full' onSubmit={onSubmit}>
            <div className='w-[80%]'>
                {/* <Input></Input> */}
                
                <input className="border-4 border-blue-400 rounded w-full" onChange={handleInputChange} name="prompt" value={FormData || ''} required/>
            </div>
            <Button type="submit">Submit</Button>
        </form>
    </div>


  )
}

export default CustomForm