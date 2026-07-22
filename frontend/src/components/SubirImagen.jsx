import React, { useState } from 'react';

export default function SubirImagen() {
  const [cargando, setCargando] = useState(false);
  const [imagenUrl, setImagenUrl] = useState('');
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const [vistaPreviaLocal, setVistaPreviaLocal] = useState('');

  const [carpetaDestino, setCarpetaDestino] = useState('media/tienda-virtual/camisetas');
  
  const carpetas = [
    { id: 'media/tienda-virtual/camisetas', nombre: 'camisetas' },
    { id: 'media/tienda-virtual/pantalones', nombre: 'pantalones' },
    { id: 'media/tienda-virtual/gorras', nombre: 'gorras' },
    { id: 'media/tienda-virtual/calzado', nombre: 'calzado' },
  ];

  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_NAME; 
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setArchivoSeleccionado(file);
    setVistaPreviaLocal(URL.createObjectURL(file));
    setImagenUrl('');
  };

  const handleConfirmarSubida = async () => {
    if (!archivoSeleccionado) return;

    setCargando(true);

    const formData = new FormData();
    formData.append('file', archivoSeleccionado);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', carpetaDestino);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setImagenUrl(data.secure_url);
        setArchivoSeleccionado(null);
        setVistaPreviaLocal('');
      } else {
        console.error("Error de Cloudinary:", data);
      }
    } catch (error) {
      console.error("Error al subir el archivo a Cloudinary:", error);
    } finally {
      setCargando(false);
    }
  };

  const handleCancelar = () => {
    setArchivoSeleccionado(null);
    setVistaPreviaLocal('');
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg max-w-md mx-auto bg-white shadow-sm gap-4">
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Seleccionar carpeta de destino:
        </label>
        <select
          value={carpetaDestino}
          onChange={(e) => setCarpetaDestino(e.target.value)}
          disabled={cargando}
          className="w-full p-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {carpetas.map((carpeta) => (
            <option key={carpeta.id} value={carpeta.id}>
              {carpeta.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Seleccionar imagen
        </label>
        
        <input 
          type="file" 
          accept="image/*"
          onChange={handleFileSelect}
          disabled={cargando}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer disabled:opacity-50"
        />
      </div>

      {vistaPreviaLocal && !imagenUrl && (
        <div className="flex flex-col items-center gap-3 w-full border-t pt-4">
          <p className="text-xs font-medium text-gray-600">
            Vista previa antes de subir a <span className="font-bold">{carpetaDestino}</span>:
          </p>
          <img 
            src={vistaPreviaLocal} 
            alt="Vista previa local" 
            className="w-32 h-32 object-cover rounded-md border shadow-sm"
          />

          {/* Botones de acción */}
          <div className="flex gap-2 w-full mt-1">
            <button
              onClick={handleCancelar}
              disabled={cargando}
              className="flex-1 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmarSubida}
              disabled={cargando}
              className="flex-1 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors disabled:opacity-50"
            >
              {cargando ? 'Subiendo...' : 'Confirmar Envío'}
            </button>
          </div>
        </div>
      )}
      {cargando && (
        <p className="text-sm text-blue-600 mt-2 animate-pulse font-medium">
          Subiendo archivo a <span className="font-bold">{carpetaDestino}</span>...
        </p>
      )}
      {imagenUrl && !cargando && (
        <div className="mt-2 flex flex-col items-center border-t pt-4 w-full">
          <p className="text-xs text-green-600 font-medium mb-2">
            ¡Subida con éxito a <span className="font-bold">{carpetaDestino}</span>!
          </p>
          <img 
            src={imagenUrl} 
            alt="Vista previa final" 
            className="w-32 h-32 object-cover rounded-md shadow-md border"
          />
        </div>
      )}
    </div>
  );
}