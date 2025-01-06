import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
//import FocusTemplate from './_sidebar/FocusTemplate'

interface SidebarProps {
    setOverlayVisible: (isVisible: boolean) => void;
    setActiveTab:(isActive: string) => void;
    activeTab:string;
  }

function SideBar({setOverlayVisible, setActiveTab, activeTab}: SidebarProps) {


  
  const focuses = JSON.parse(localStorage.getItem('focuses') || '[]')
  


  const FocusTemplate = ({ Focus }:{Focus:string}) => {
    return (
      <div className="p-6 border-2 border-blue-500 rounded-lg shadow-lg mb-6 hover:bg-blue-50 transition duration-300">
        <h3 className="text-2xl font-bold text-blue-700">{Focus}</h3>
        <p className="text-gray-500 mt-2">
          Here’s a brief description or details about the focus area. You could also
          include additional content like images, links, or buttons.
        </p>
      </div>
    );
  };
  
  return (
    <div className=" w-1/6 ml-1 mr-32 h-[90vh] border-y-2 border-r-4 border-bl border-blue-400 items-center space-x-4">
        <div>
          <Button onClick={() => {console.log(); setOverlayVisible(true)} }>Add Project</Button>
        </div>
        {focuses.map((item:string, index: number) => (
            <div key={index}>
              <button className={`m-1 ${item === activeTab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`} onClick={()=> {console.log(activeTab), setActiveTab(item)}}>{item}</button>
            </div>
            //<FocusTemplate Focus={item}/>
               
            
        ))}
    </div>
  )
}

export default SideBar