import React from 'react';

const tamañoTexto = {
  md: 'text-xl',
  lg: 'text-3xl',
  xl: 'text-4xl',
}

const grosorTexto = {
  normal: 'font-normal',
  medium: 'font-medium',
  bold: 'font-bold',
}

export default function Boton({ texto, tamaño, grosor, }) {

  const claseTamaño = tamañoTexto[tamaño] || tamañoTexto.md;
  const claseGrosor = grosorTexto[grosor] || '';

  return (
    <button className={`bg-[#284631] font-[Agdasima] text-lg text-white px-4 py-2 rounded-xl hover:bg-[#1e3525] transition-colors duration-300 ${claseTamaño} ${claseGrosor}`} >
      {texto}
    </button>
  );
}