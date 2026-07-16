import React from "react";
import Tarjeta from "./Tarjeta.jsx";

export default function Carrito() {
  return (
    <div className='w-full h-full bg-black/30 fixed top-0 left-0 z-40'>
      <div className="fixed top-0 right-0 w-[400px] h-full bg-white shadow-lg z-50">
        <div className='flex items-center justify-left px-4 py-3 bg-gray-200 font-[Agdasima] gap-2 text-[30px]'>
          <h1 className='font-bold'>Mi Carrito</h1>
          <h1>|</h1>
          <h1>1 Producto</h1>
        </div>
        <div>
          <Tarjeta />
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
}