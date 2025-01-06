import React from 'react'
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Templates } from './Templates';

interface SidebarProps {
    setOverlayVisible: (isVisible: boolean) => void;
    setActiveTab:(isActive: string) => void;

  }
{/* <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
    <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
      <h2 className="text-xl font-bold mb-4">This is the overlay</h2>
      <button
        onClick={() => setOverlayVisible(false)}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Close Overlay
      </button>
    </div>
  </div> */}
function NewProjectOverlay({setOverlayVisible, setActiveTab}: SidebarProps) {

    const [selectedItems, setSelectedItems] = useState<string[]>([]);


   

    const SubmitHandler = (e:any) => {
        e.preventDefault()
        // Create a FormData object from the form
        const formData = new FormData(e.target);
    // Extract all selected checkboxes
    
    const focus:string = e.target.focus.value;
    const item = localStorage.getItem(focus);

    if(item){
        alert("Model Name Already Exists. Choose a New Name");
        return; // Stop form submission
    }


    console.log(e.target.focus.value)

    const selectedCheckboxes: string[] = e.target.querySelectorAll('input[type="checkbox"]:checked');
    const checkedboxes: string[] = []
    //const actives = localStorage.getItem(itemName);
    if (selectedCheckboxes.length === 0) {
        alert("Please select at least one model or delete the previous model!");
        return; // Stop form submission
    }

    selectedCheckboxes.forEach((checkbox: any) => {
        checkedboxes.push(checkbox.value)
        console.log("CheckBox Value")
        console.log(checkbox); // Push the value of each checked checkbox
    });
    
    const focuses = JSON.parse(localStorage.getItem('focuses') || '[]')
    localStorage.setItem(focus, JSON.stringify(checkedboxes) )
    localStorage.setItem('focuses', JSON.stringify([...focuses, focus ]))

    setActiveTab(focus)
    
    // Reset the form
    e.target.reset();

    setOverlayVisible(false)


    }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">

    <div className="bg-white rounded-lg shadow-lg p-6 w-100 text-center">
        <div className='flex'>
        <h2 className="text-xl font-bold mb-4">Choose Your Models</h2>
      <Image onClick={() => setOverlayVisible(false)} src ="https://cdn-icons-png.flaticon.com/128/2997/2997911.png" alt = 'icon' width={25} height={25}/>

        </div>

      <form onSubmit={ SubmitHandler}>
      <input className="border-4 border-blue-400 rounded w-full" name="focus"  required/>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
          {/* Checkbox Items */}
          {Templates.map((template, index) => (
            <label key={index} className="flex items-center space-x-2">
                {/* <Image/> */}
            <span>{template.name}</span>
              <input
                type="checkbox"
                value={template.name}
                className="h-5 w-5 text-blue-500"
              />
              
            </label>
          ))}
        </div>
    
        <Button type="submit">Submit</Button>


      </form>

      
    </div>
  </div>
  )
}

 
export default NewProjectOverlay