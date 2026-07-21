import React from "react";

export default function ItemCarrito(){

  const {id, producto, cantidad} = Item;

  return(
    <div className="flex items-center justify-between p-3 mb-3 bg-white border border-gray-100 rounded-xl shadow-sm gap-3">
      
      {/* 1. Imagen en miniatura del producto */}
      <img 
        src={producto.imagen || '/placeholder.png'} 
        alt={producto.nombre} 
        className="w-16 h-16 object-cover rounded-lg bg-gray-100 flex-shrink-0"
      />
    {/* 2. Información: Nombre y Precio */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-gray-800 truncate">
          {producto.nombre}
        </h4>
        <p className="text-xs text-gray-500 font-medium mt-0.5">
          ${producto.precio}
        </p>
      </div>

      {/* 3. Controles de Cantidad (+ / -) */}
      <div className="flex items-center border border-gray-200 rounded-lg p-1 gap-2 bg-gray-50">
        <button 
          onClick={() => onActualizarCantidad(id, cantidad - 1)}
          disabled={cantidad <= 1}
          className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-black disabled:opacity-30 cursor-pointer"
        >
          <Minus className="w-3 h-3" />
        </button>

        <span className="text-xs font-bold w-4 text-center text-gray-800">
          {cantidad}
        </span>

        <button 
          onClick={() => onActualizarCantidad(id, cantidad + 1)}
          className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-black cursor-pointer"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

      {/* 4. Botón de Eliminar */}
      <button 
        onClick={() => onEliminarItem(id)}
        className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
        title="Eliminar producto"
      >
        <Trash2 className="w-4 h-4" />
      </button>

    </div>
  )
}