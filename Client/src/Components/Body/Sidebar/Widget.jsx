/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { FaPlusCircle } from "react-icons/fa";
import { FaCircleMinus } from "react-icons/fa6";

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
    <div className='px-5 py-3 text-xl'>
      <button className='flex flex-row gap-2 items-center' onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? <FaCircleMinus /> : <FaPlusCircle />}
        {componentName}
      </button>
      {isVisible && <div>{componentName} Content</div>}
    </div>
  );
};

const App = () => {
  const components = ['Google Slide', 'Pomodoro Timer', 'Spotify'];

  return (
    <div>
      {components.map((name) => (
        <ToggleComponent key={name} componentName={name} />
      ))}
    </div>
  );
};

export default App;
