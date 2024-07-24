// import React from 'react'
import Marquee from './Marquee/Marquee'

const Navbar = () => {
  return (
    <div className='w-100 h-[10vh] border border-red-400 poppins-medium px-5 flex justify-between items-center gap-10'>
        <div className="text-3xl">
            <span>Good
                <span> morning, </span> 
            </span>
            <span className="text-[#b0afaf]">Aryan</span>
        </div>

        <div className="overflow-hidden border border-red-400 flex-grow px-5 text-3xl rounded-2xl">
            <Marquee text="Sample Announcement 1" />
        </div>
        
        <div className="flex flex-col text-right justify-end">
            <div className="text-3xl">08:15 AM </div>
            <div className="text-md text-[#b0afaf]">July 24, Wednesday</div>
        </div>
    </div>
  )
}

export default Navbar