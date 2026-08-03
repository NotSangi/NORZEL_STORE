import React, { useState, useEffect } from 'react';
import api from '../APIs/axios.js';
import {Products} from '../APIs/'

const selectStyles = 'text-gray-600 p-2 w-full h-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition bg-white disabled:bg-gray-100 disabled:cursor-not-allowed shadow-md';
const inputStyles = 'text-gray-600 border border-gray-300 rounded-lg p-2 w-full h-full focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition bg-white disabled:bg-gray-100 disabled:cursor-not-allowed shadow-md';

export default function FormularioProducto({ onCreatedProduct }) {

  //Aqui se guarda la informacion del formulario, para luego enviarla a la base de datos
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description:'',
    price: '',
    slug: '',
  })
  //Aqui se aisla el slug de la categoria padre seleccionada
  const [slugCategory, setSlugCategory] = useState({
    slug: '',
  })
  //Aqui se guarda la informacion de las categorias padre provenientes de la API
  const [categories, setCategories] = useState([])
  //Aqui se guarda la informacion de las subcategorias basadas en la categoria padre seleccionada
  const [subCategories, setSubCategories] = useState([])

  //Se llama la informacion de las categorias padre a traves de la API y se guarda en "setCategories"
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await Products.getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  //Se llama la informacion de las subcategorias a traves de la API cada vez que cambia "slugCategory.slug" y se guarda en "setSubCategories"
  useEffect(() => {
    if (!slugCategory.slug) {
      setSubCategories([]);
      return;
    }

    const fetchSubCategories = async () => {
        const data = await Products.getSubCategories(slugCategory.slug);
        setSubCategories(data);
    };

    fetchSubCategories();
  }, [slugCategory.slug])

  //Funcion para generar el slug en tiempo real
  const generateSlug = (texto) => {
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

    //si el <select> llamado "parentcategory" cambia, se guarda el slug dentro de "setSlugCategory" y se limpia la subcategoria guardada previamente en "formData"
    if (name === 'parentcategory') {
      setSlugCategory({ slug: value });
      setFormData((prev) => ({
        ...prev,
        category: '',
      }));

      return;
    }

    //Se toman los valores de los inputs y se guardan en "formData", si el input es "name" se genera el slug en tiempo real
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'name') {
        updated.slug = generateSlug(value);
      }

      return updated;
    });
  };

  // useEffect(() => {
  //     console.log('Formulario que se envia a la base de datos:', formData);
  //   }, [formData]);

  //funcion para enviar la informacion del formulario a la base de datos
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Si algun campo esta vacio se muestra un alert 
    if (!formData.name || !formData.category || !formData.description || !formData.price || !formData.slug) {
      alert('Completa todos los campos')
      return;
    }

    const payload = {
      ...formData,
      price: parseFloat(formData.price)
    }
    //Se hace la peticion POST a la API para guardar el producto en la base de datos, si hay algun error se muestra un alert con el error
    try {
      const product = await Products.saveProduct(payload);
      const newProduct = await response.json();

      alert('¡¡Producto guardado exitosamente!!');

      //Se reinician los campos del formulario
      setFormData({
        name: '',
        description: '',
        price: '',
        slug: '',
        category: '',
      });
      setSlugCategory({ slug: '' });

      //Se llama la funcion "onCreatedProduct" que se pasa como prop desde el componente padre, para actualizar la lista de productos
      if (onCreatedProduct) onCreatedProduct(newProduct);
    } catch (error) {
      console.log({ tipo: 'error', texto: error.message || 'Error de conexión' });
    }
  };

  return (
    <div className='font-[Agdasima] w-full h-full flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='text-xl w-full h-full py-30 px-20 flex justify-center items-center '>
        <div className='flex flex-col w-1/3 h-1/2 flex items-center justify-center gap-8 border border-gray-300 rounded-xl shadow-md py-8 px-12'>
          <label className='text-4xl font-bold py-4'>Formulario de Productos</label>
          <div className='flex flex-col w-full'>
            <label className='ml-2'>Nombre del Producto*</label>
            <input name='name' type='text' value={formData.name} onChange={handleChange} placeholder='Ej: Camiseta Oversize' className={inputStyles}/>
          </div>

          <div className='flex flex-col w-full'>
            <label className='ml-2'>Slug (URL)*</label>
            <input name='slug' type='text' value={formData.slug} onChange={handleChange} placeholder='Ej: camiseta-oversize' className={inputStyles}/>
          </div>
        
          <div className='flex flex-row w-full gap-4'>
            <div>
              <label className='ml-2'>Categoria*</label>
              <select name='parentcategory' onChange={handleChange} value={slugCategory.slug || ''} className={selectStyles}>
                <option value=''>{'Selecciona una Categoria'}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className='ml-2'>Subcategoria*</label>
              <select name='category' disabled={!slugCategory.slug} onChange={handleChange} value={formData.category} className={selectStyles}>
                <option value=''>{!slugCategory.slug ? 'Primero selecciona una Categoria' : 'Selecciona una Subcategoria'}</option>
                {subCategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name} ({sub.slug})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='flex flex-row w-full gap-10'>
            <div className='flex flex-col w-full'>
              <label className='ml-2'>Precio ($)*</label>
              <input name='price' type='number' value={formData.price} onChange={handleChange} placeholder='50000' className='text-gray-600 border border-gray-300 rounded-lg p-2 w-full max-h-1/3 focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition bg-white disabled:bg-gray-100 disabled:cursor-not-allowed shadow-md'/>
            </div>

            <div className='flex flex-col w-full'>
              <label className='ml-2'>Descripcion*</label>
              <textarea name='description' value={formData.description} onChange={handleChange} placeholder='Detalles sobre el producto' className={inputStyles}/>
            </div>
          </div>

            <button type='submit' className='bg-[#284631] text-white px-4 py-2 rounded-lg hover:bg-[#1e3525] transition-colors duration-300 w-1/3 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'>
              Guardar Producto
            </button>
        </div>
      </form>
    </div>
  )
}