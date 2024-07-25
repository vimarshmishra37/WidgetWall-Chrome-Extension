/* eslint-disable no-unused-vars */
// import { useState } from 'react'
// import MusicPlayer from './Components/musicPlayer/MusicPlayer';
import ReactDOM from 'react-dom';
import React from 'react';

import { useEffect, useState } from 'react';
import './App.css'
import Navbar from './Components/Navbar/Navbar'
// import Body from './Components/Body/Body'
// import AllWidgets from './pages/AllWidgets'
import { FaPlusCircle } from "react-icons/fa";
import { FaCircleMinus } from "react-icons/fa6";
import Pomodoro from './Components/pomodoro/Pomodoro'
import Calender from './Components/Calender/Calender';


// eslint-disable-next-line react/prop-types
const ToggleComponent = ({ componentName }) => {
  // Initialize state from localStorage or default to true
  const [isVisible, setIsVisible] = useState(
    JSON.parse(localStorage.getItem(componentName)) ?? true
  );

  useEffect(() => {
    // Store state in localStorage whenever it changes
    localStorage.setItem(componentName, JSON.stringify(isVisible));
  }, [isVisible, componentName]);

  return (
    <div className='px-5 py-3 text-md border-2 border-collapse'>
      <button className='flex flex-row gap-2 items-center' onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? <FaCircleMinus /> : <FaPlusCircle />}
        {componentName}
      </button>
      {isVisible && <div>{componentName} Content</div>}
    </div>
  );
};

function App() {
  const components = ['Google Slide', 'Pomodoro Timer', 'Spotify', 'Poll', 'Google Calender', 'Google Sheet', 'Google Form', 'Quote'];
  const icons = [<FaCircleMinus />, <FaCircleMinus /> ];
  return (
    <div className=''>
      <Navbar />
      
      <div className='mx-10 h-[90vh] pt-10 pb-10 poppins-medium px-5 flex flex-row items-center'>
        {/* Part 1 */}
        <div className='h-full w-[20%] flex flex-col justify-between items-start pr-5'>
          {/* Listing of components started from here */}
          <div className='w-full'>
              {components.map((name) => (
                <ToggleComponent key={name} componentName={name} />
              ))}
          </div>
          {/* <div> */}
            {/* <Pomodoro /> */}
            {/* <Calender /> */}
          {/* </div> */}
        </div>

        {/* Part 2 */}
        <div className='h-full w-[80%] flex flex-row flex-wrap gap-5'>
          <div className='min-w-[64%] h-[80%] rounded-xl border bg-white'>
            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSHU5lCgMJ3Akb8ovraVAAX4v31zv9WtbDghTsP2Om2iLCHxj4hxwq0oGrIZ4CtgQgUcn7Dbetzxu6l/embed?start=false&loop=false&delayms=0"
              className="h-full w-full"
            ></iframe>
          </div>
          {/* <div className='min-w-[32%] h-[80%] rounded-xl border border-purple-600'>p1</div> */}
          <div className='min-w-[32%] h-[80%] rounded-xl flex flex-col gap-5'>
          <div className='w-full h-1/2 rounded-xl border-2 border-[#5d7dfc] bg-white overflow-hidden'>
  <Pomodoro />
</div>
              <div className='w-full h-1/2 rounded-xl bg-[#5d7dfc] pl-5 text-white'>
                  Quote comes here
              </div>

          </div>
          <div className='min-w-[32%] h-[80%] rounded-xl border border-[#5d7dfc] bg-white'>Other Widget
          {/* <MusicPlayer /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
