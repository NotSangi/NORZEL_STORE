import React from "react";

export default function Input({placeholder}) {
  return (
    <input type="text" placeholder={placeholder} className='flex  w-1/2 h-11 pl-12 pr-4 bg-white border border-gray-200 rounded-full'/>
  );  
}