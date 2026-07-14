import React from 'react';

export default function Footer({}) {
  return (
    <div className='w-full flex items-center justify-between px-40 py-10 border-t border-gray-200'>
      <div className='w-1/2 flex flex-col items-center justify-center gap-3'>
        <h1 className='text-[45px] font-[Alfa+Slab+One] font-black'>Norzel Store</h1>
        <div className='flex items-center justify-center gap-3'>
          <img src='./src/assets/icons/icono_facebook.png' alt='facebook' className='w-4 h-4'/>
          <img src='./src/assets/icons/icono_tiktok.png' alt='tiktok' className='w-4 h-4'/>
          <img src='./src/assets/icons/icono_instagram.png' alt='instagram' className='w-4 h-4'/>
        </div>
      </div>
      <div className='w-1/2 flex items-start justify-between gap-18'>
        <div>
          <h2 className='font-[Agdasima] font-bold'>Productos</h2>
          <h3 className='font-[Agdasima]'>Camisas</h3>
          <h3 className='font-[Agdasima]'>Pantalones</h3>
          <h3 className='font-[Agdasima]'>Gorras</h3>
          <h3 className='font-[Agdasima]'>Calzado</h3>
        </div>
        <div>
          <h2 className='font-[Agdasima] font-bold'>Productos</h2>
          <h3 className='font-[Agdasima]'>Deportes</h3>
          <h3 className='font-[Agdasima]'>Casual</h3>
          <h3 className='font-[Agdasima]'>Elegante</h3>
        </div>
        <div>
          <h2 className='font-[Agdasima] font-bold'>Asistencia</h2>
          <h3 className='font-[Agdasima]'>Preguntas Frecuentes</h3>
          <h3 className='font-[Agdasima]'>Terminos y Condiciones</h3>
          <h3 className='font-[Agdasima]'>Politica de Privacidad</h3>
        </div>
        <div>
          <h2 className='font-[Agdasima] font-bold'>Institucion</h2>
          <h3 className='font-[Agdasima]'>Sobre Nosotros</h3>
        </div>
      </div>
    </div>
  )
}