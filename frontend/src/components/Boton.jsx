import React from 'react';

export default function Boton({ texto, tamaño, grosor }) {

  const tamañoTexto = {
    md: 'text-[20px]',
    lg: 'text-[30px]',
    xl: 'text-[40px]',
  }

  const grosorTexto = {
    bold: 'font-bold',
  }

  const claseTamaño = tamañoTexto[tamaño] || tamañoTexto.md;
  const claseGrosor = grosorTexto[grosor] || '';

  return (
    <button className={`bg-[#284631] font-[Agdasima] text-lg text-white px-4 py-2 rounded-xl hover:bg-[#1e3525] transition-colors duration-300 ${claseTamaño} ${claseGrosor}`} >
      {texto}
    </button>
  );
}