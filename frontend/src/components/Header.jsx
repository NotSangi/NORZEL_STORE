import React from 'react';
import Input from './Input.jsx';

export default function Header() {
  
  const botonCircular = "w-9 h-9 rounded-full shadow-md/30 inset-shadow-sm/30";

  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-md/30">
      <div className='flex items-center justify-between w-[33.33vw]'>
        <button className={botonCircular}/>
        <div className='flex items-center justify-between gap-2'>
          <button className={botonCircular}/>
          <button className={botonCircular}/>
          <button className={botonCircular}/>
          <button className={botonCircular}/>
          <button className={botonCircular}/>
        </div>
      </div>
      <div className='flex items-center justify-center w-[33.33vw]'>
        <Input placeholder='buscar'/>
      </div>
      <div className='flex items-center gap-2 w-[33.33vw] justify-end'>
        <button className={botonCircular}/>
        <button className={botonCircular}/>
      </div>
    </header>
  );
}