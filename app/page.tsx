"use client"
import CustomForm from "./_components/_customform/CustomForm";
import TopHeader from "./_components/_topheader/TopHeader";
import SideBar from "./_components/_sidebar/SideBar";
import { useState } from "react";
import NewProjectOverlay from "./_components/_projectoverlay/NewProjectOverlay";
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

    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [activeTab, setActiveTab] = useState<string>('');
    
  
  return (
    <div>
      <div  className={`${isOverlayVisible ? 'blur-sm' : ''} transition-filter duration-300 flex flex-col`} >
        <div className="h-[10vh]">
          <TopHeader/>
        </div>
        
        <div className={`flex-1 flex h-[90vh] ${isOverlayVisible ? 'pointer-events-none' : ''}`}>
          {/* <Sidebar/> */}
          
          <SideBar
          setOverlayVisible={setOverlayVisible}
          setActiveTab={setActiveTab}
          activeTab={activeTab}/>
          <CustomForm
          Tab={activeTab}/>

        </div>

      </div>
      {isOverlayVisible && (
       <NewProjectOverlay setOverlayVisible={setOverlayVisible} setActiveTab={setActiveTab}/>
      )}
    </div>

  );
}
