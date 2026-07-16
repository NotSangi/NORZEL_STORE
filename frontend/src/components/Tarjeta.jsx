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
    <div className='flex flex-row items-center justify-between w-full h-60 bg-white border-b border-gray-200 gap-2 px-3'>
      <div>
        <div className='flex items-center justify-center w-full h-30 bg-gray-200 px-3'>
          <img src='./src/assets/images/CARGO 2.png' className='w-25 h-25'/>
        </div>
      </div>
      <div>
        {productos.map((product) => (
          <div key={product.id} className='flex flex-col items-start justify-center w-full h-30 gap-2'>
            <div className='text-[20px] font-[Agdasima] text-gray-800'>{product.name}</div>
            <div className='text-[16px] font-[Agdasima] text-gray-600'>{product.description}</div>
            <div className='text-[16px] font-[Agdasima] text-gray-800'>{product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}