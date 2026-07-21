import React from "react";
import { useState, useEffect } from 'react'

export default function Tarjeta() {

  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const urlAPI='http://127.0.0.1:8000/api/productos/items/';

    fetch(urlAPI)
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudo obtener la información de la API');
        }
        return response.json();
      }).then((data) => {
        setProductos(data);
      }).catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      {productos.map((product) => (
        <div key={product.id} className='flex items-center justify-center w-70 h-full bg-white outline-2 outline-white hover:outline-gray-400 transition-all duration-300 hover:cursor-pointer'>
          <div>
            <div className='w-70 h-auto bg-gray-100 flex items-center justify-center'>
              <img src='./src/assets/images/CARGO 2.png' className='w-50 h-50'/>
            </div>
            <div className='flex items-start justify-between px-4 py-2 gap-2 text-[18px]'>
              <div className='w-full h-full bg-white flex flex-col items-center justify-center font-[Agdasima]'>
                <div className=''>{product.name}</div>
                <div className='text-gray-400'>{product.description}</div>
              </div>
              <div className='w-full h-full bg-white flex justify-end font-[Agdasima]'>
                <div className=''>${product.price}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}