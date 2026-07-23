import React, { useState, useEffect } from 'react';

export default function FormularioProducto({ onProductoCreado }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    slug: '',
    category: '' // Aquí guardaremos la SUBCATEGORÍA seleccionada (ID)
  });

  // Estado separado únicamente para filtrar subcategorías por la API
  const [categoriaSlug, setCategoriaSlug] = useState({
    slug: ''
  });

  // Estados para listas
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);

  // Estados de carga
  const [cargandoCategorias, setCargandoCategorias] = useState(true);
  const [cargandoSubcategorias, setCargandoSubcategorias] = useState(false);

  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  // 1. Obtener categorías padre al montar el componente
  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const respuesta = await fetch('http://127.0.0.1:8000/api/productos/categorias/?is_parent=true');
        if (!respuesta.ok) {
          throw new Error('No se pudieron cargar las categorías');
        }
        const data = await respuesta.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      } finally {
        setCargandoCategorias(false);
      }
    };

    obtenerCategorias();
  }, []);

  // 2. Obtener subcategorías cada vez que cambia 'categoriaSlug.slug'
  useEffect(() => {
    if (!categoriaSlug.slug) {
      setSubcategorias([]);
      return;
    }

    const obtenerSubcategorias = async () => {
      setCargandoSubcategorias(true);
      try {
        const respuesta = await fetch(
          `http://127.0.0.1:8000/api/productos/categorias/?parent=${categoriaSlug.slug}`
        );
        if (!respuesta.ok) {
          throw new Error('No se pudieron cargar las subcategorías');
        }
        const data = await respuesta.json();
        setSubcategorias(data);
      } catch (error) {
        console.error('Error al obtener subcategorías:', error);
      } finally {
        setCargandoSubcategorias(false);
      }
    };

    obtenerSubcategorias();
  }, [categoriaSlug.slug]);

  // Helper para generar slug en tiempo real
  const generarSlug = (texto) => {
    return texto
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 1. Si cambia la Categoría Padre
    if (name === 'categoriaPadre') {
      // Guardamos el slug en su estado aislado (NO en formData)
      setCategoriaSlug({ slug: value });

      // Limpiamos la subcategoría guardada previamente en formData
      setFormData((prev) => ({
        ...prev,
        category: '',
      }));

      return;
    }

    // 2. Manejo general de inputs (incluida la Subcategoría -> formData.categoria)
    setFormData((prev) => {
      const actualizados = { ...prev, [name]: value };

      if (name === 'name') {
        actualizados.slug = generarSlug(value);
      }

      return actualizados;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje({ tipo: '', texto: '' });

    try {
      const respuesta = await fetch('http://127.0.0.1:8000/api/productos/items/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Enviamos únicamente el formData limpio que tu backend espera
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      if (!respuesta.ok) {
        throw new Error('Ocurrió un error al guardar el producto');
      }

      const nuevoProducto = await respuesta.json();

      setMensaje({ tipo: 'exito', texto: '¡Producto guardado exitosamente!' });

      // Reiniciamos ambos estados tras guardar
      setFormData({
        name: '',
        description: '',
        price: '',
        slug: '',
        category: '',
      });
      setCategoriaSlug({ slug: '' });

      if (onProductoCreado) onProductoCreado(nuevoProducto);
    } catch (error) {
      setMensaje({ tipo: 'error', texto: error.message || 'Error de conexión' });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className='flex-auto justify-center items-center'> 
      <div className="mt-25 max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md border border-gray-100 font-[Agdasima]">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Agregar Nuevo Producto</h2>

        {mensaje.texto && (
          <div
            className={`p-4 mb-6 rounded-xl text-lg font-medium ${
              mensaje.tipo === 'exito'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-xl font-medium text-gray-700 mb-1">
              Nombre del Producto
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Camiseta Oversize Verde"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#284631] focus:border-transparent outline-none transition text-lg"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block font-medium text-gray-700 mb-1 text-xl">
              Slug (URL)
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="ej-camiseta-oversize-verde"
              required
              className="w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-600 rounded-xl focus:ring-2 focus:ring-[#284631] outline-none transition text-lg"
            />
          </div>

          {/* Categoría y Subcategoría */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Categoría Padre: name="categoriaPadre" -> guarda directamente el slug en 'categoriaSlug' */}
            <div>
              <label className="block font-medium text-gray-700 mb-1 text-xl">
                Categoría
              </label>
              <select
                name="categoriaPadre"
                onChange={handleChange}
                value={categoriaSlug.slug || ''}
                disabled={cargandoCategorias}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#284631] focus:border-transparent outline-none transition bg-white disabled:bg-gray-100 disabled:cursor-not-allowed text-lg"
              >
                <option value="">
                  {cargandoCategorias ? 'Cargando categorías...' : 'Selecciona una categoría'}
                </option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategoría: name="categoria" -> guarda el ID directamente en 'formData.categoria' */}
            <div>
              <label className="block text-xl font-medium text-gray-700 mb-1">
                Subcategoría
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                disabled={!categoriaSlug.slug || cargandoSubcategorias}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#284631] focus:border-transparent outline-none transition bg-white disabled:bg-gray-100 disabled:cursor-not-allowed text-lg"
              >
                <option value="">
                  {!categoriaSlug.slug
                    ? 'Primero elige una categoría'
                    : cargandoSubcategorias
                    ? 'Cargando subcategorías...'
                    : 'Selecciona una subcategoría'}
                </option>
                {subcategorias.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name} ({sub.slug})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Precio */}
          <div>
            <label className="block text-xl font-medium text-gray-700 mb-1">
              Precio ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="29.99"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#284631] focus:border-transparent outline-none transition text-lg"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-xl font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detalles sobre el producto..."
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#284631] focus:border-transparent outline-none transition resize-none text-lg"
            />
          </div>

          <button
            type="submit"
            disabled={cargando || cargandoCategorias}
            className="w-full bg-[#284631] hover:bg-[#1e3525] text-white font-medium py-3 px-4 rounded-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {cargando ? 'Guardando...' : 'Guardar Producto'}
          </button>
        </form>
      </div>
    </div>
  );
}