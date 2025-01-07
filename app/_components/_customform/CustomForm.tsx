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
import { Activity } from 'lucide-react';

function CustomForm({Tab}: {Tab:string}) {

    const models = JSON.parse(localStorage.getItem(Tab)|| "[]")
    console.log(models)
    const [FormData, setData] = useState<any>('');
    
    const [ActiveModel, setActiveModel] = useState<string>('')
    const [convo, setConvo] = useState<{ prompt: any; response: any }[]>([]);
    const CallAPI=async(data: any) => {
        console.log("ACTIVE: " + ActiveModel)

        if(!ActiveModel){
          console.error("Error finding Active Model");
        }
        try {
            const res = await fetch("/api/resp/" + ActiveModel  , {
              method: "POST", //change to post 
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({prompt: data}), // Send prompt as JSON
            });
      
            if (res.ok) {
              const data = await res.json();
              console.log("REturned Data")
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

    }

    const handleInputChange = (event:any)=>{
        
        const {name, value} = event?.target;
        setData(value)
        console.log(name)
        
    }

    const onSubmit=async(e:any) => {
        e.preventDefault()
        console.log(FormData)
        console.log("hello")
        if(ActiveModel){
          const res = await CallAPI(e.target.prompt.value)
          console.log("response: ", res)
          setConvo((prevConversation) => [...prevConversation, { prompt: FormData, response: res.response }])
          setData('')
        }
        else{
          alert("A model wasn't properly selected")
        }
 

        



        
    }
  console.log("atc: " +ActiveModel)
  return (
    <div className='h-[90vh]'>
        <div className='flex flex-wrap'>
        {models.map((model:string, index:number) => {
          // Only set ActiveModel for the first item (index === 0)
          if (index === 0 && !ActiveModel) {
            setActiveModel(model); // Set the first model as the active one
          }

          return (
            <div key={index}>
              <input
                className='peer hidden'
                type="radio"
                id={`tab-${model}`}
                name="mytabs"
                checked={ActiveModel === model}
                onChange={() => setActiveModel(model)}
              />
              <label htmlFor={`tab-${model}`} className="bg-gray-300 peer-checked:bg-green-500 px-4 py-2 rounded cursor-pointer">
                {model}
              </label>
            </div>
          );
        })}
          {/* {models.map((model: string, index:number) => (
              <div key={index}>
                <input
                  className='peer hidden'
                  type="radio"
                  id={`tab-${model}`} // Unique ID for each input
                  name="mytabs"
                   defaultChecked={index === 0} // Check the first radio button by default
                  //checked={ActiveModel === model}
                  onChange={() => {setActiveModel(model)}}
                />
                <label className="bg-gray-300 peer-checked:bg-green-500 px-4 py-2 rounded cursor-pointer" htmlFor={`tab-${model}`}>{model}</label>
 
              </div>

              if(index == 0){
                setActiveModel(model);
              }
             
              

          ))} */}

        </div>
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