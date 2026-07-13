import React from "react";

export default function Input({placeholder}) {
  return (
    <div className='flex items-center justify-start w-1/2 h-11 pl-4 pr-4 bg-white border border-gray-200 rounded-full gap-2 focus-within:ring-2 focus-within:outline-none focus-within:ring-gray-400 transition-all duration-300'>
      <img src='./src/assets/icons/icono_buscar.png' alt='buscar' className='w-6 h-6'/>
      <input type="text" placeholder={placeholder} className='w-full text-[20px] font-[Agdasima] outline-none'/>
    </div>
  );  
}