import {useEffect, useState} from 'react'
import Marquee from './Marquee/Marquee'

const Navbar = () => {

    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const currentTime = new Date();
            const formattedTime = currentTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });
            setTime(formattedTime);
        };
        updateTime();
        const intervalId = setInterval(updateTime, 1000);
        return () => clearInterval(intervalId);
    }, []);


    useEffect(() => {
        const currentDate = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        setDate(formattedDate);
    }, []);


    useEffect(() => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      let greetingMessage;
      if(currentHour < 12) {
        greetingMessage = 'Good morning, ';
      } else if(currentHour < 18) {
        greetingMessage = 'Good afternoon, ';
      } else {
        greetingMessage = 'Good evening, ';
      }
  
      setGreeting(greetingMessage);
    }, []);
  
  
  return (
    <div className='w-100 h-[10vh] border border-red-400 poppins-medium px-5 flex justify-between items-center gap-10'>
        <div className="text-3xl">
            <span>
                {greeting}
            </span>
            <span className="text-[#b0afaf]">Aryan</span>
        </div>

        <div className="overflow-hidden border border-red-400 flex-grow px-5 text-3xl rounded-2xl">
            <Marquee text="📍 Sample Announcement 1 📍" />
        </div>
        
        <div className="flex flex-col text-right justify-end">
            <div className="text-3xl">{time} </div>
            <div className="text-md text-[#b0afaf]">{date}</div>
        </div>
    </div>
  )
}

export default Navbar