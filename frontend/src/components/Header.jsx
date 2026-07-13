import React from 'react';
import Input from './Input.jsx';

export default function Header() {
  
  const botonCircular = 'w-9 h-9 rounded-full shadow-md/30 inset-shadow-sm/30 flex items-center justify-center hover:cursor-pointer';

  return (
    <header className='w-full bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-md/30'>
      <div className='flex items-center justify-between w-[33.33vw]'>
        <button className={botonCircular}><img src='./src/assets/icons/icono_logo.png' alt='logo' className='w-5 h-5'/></button>
        <div className='flex items-center justify-between gap-2'>
          <button className={botonCircular}><img src='./src/assets/icons/icono_camiseta.png' alt='camiseta' className='w-5 h-5'/></button>
          <button className={botonCircular}><img src='./src/assets/icons/icono_blusa.png' alt='blusa' className='w-5 h-5'/></button>
          <button className={botonCircular}><img src='./src/assets/icons/icono_gorra.png' alt='gorra' className='w-5 h-5'/></button>
          <button className={botonCircular}><img src='./src/assets/icons/icono_zapato.png' alt='zapato' className='w-5 h-5'/></button>
        </div>
      </div>
      <div className='flex items-center justify-center w-[33.33vw]'>
        <Input placeholder='Buscar'/>
      </div>
      <div className='flex items-center gap-2 w-[33.33vw] justify-end'>
        <button className={botonCircular}><img src='./src/assets/icons/icono_carrito.png' alt='carrito' className='w-5 h-5'/></button>
        <button className={botonCircular}><img src='./src/assets/icons/icono_usuario.png' alt='usuario' className='w-5 h-5'/></button>
      </div>
    </header>
  );
}