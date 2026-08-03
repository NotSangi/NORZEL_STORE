import React, { useEffect, useState } from "react";
import api from "../APIs/axios.js";
import {Products} from '../APIs/'

//Estilos para los <select> y <input> del formulario
const selectStyles = 'text-gray-600 p-2 w-full h-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition bg-white disabled:bg-gray-100 disabled:cursor-not-allowed shadow-md';
const inputStyles = 'text-gray-600 border border-gray-300 rounded-lg p-2 w-full h-full focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition bg-white disabled:bg-gray-100 disabled:cursor-not-allowed shadow-md';

export default function FormularioVariantes() {

  //Constante que manda la informacion del producto a la Base de Datos
  const [formData, setFormData] = useState ({
    name: '',
    product: '',
    size: '',
    color: '',
    stock: ''
  })

  //Lista que va a guardar la informacion del primer Fetch de la API (Categorias Padre)
  const [catParent, setCatParent] = useState([])
  //Lista que va a guardar las subcategorias basadas en las opciones elegidas de las Categorias Padre
  const [subCat, setSubCat] = useState([])
  //Lista que va a guardar los productos basados en la subcategoria elegida
  const [productFromSubCat, setProductFromSubCat] = useState([])
  //Lista que va a guardar la informacion de los colores traida de la API
  const [colors, setColors] = useState([])
  //Lista que va a guardar la informacion de las tallas traidas de la API
  const [sizes, setSizes] = useState([])
  //Aqui se guardan los valores seleccionados en los diferentes <select> 
  const [products, setProducts] = useState({
    cat: '',
    subcat: '',
  })

  //Se llama la informacion de las Categorias Padre y se guarda en "setCatParent". Los colores se guardan en "setColors" y las tallas se guardan en "setSizes"
  useEffect (() => {
    const fetchParent = async () => {
      const data = await Products.getCategories()
      setCatParent(data)
    }

    const fetchColors = async () => {
      const data = await Products.getColors()
      setColors(data)
    }

    const fetchSizes = async () => {
      const data = await Products.getSizes()
      setSizes(data)
    }


    fetchParent();
    fetchColors();
    fetchSizes();
  }, []);

  //Se llama la informacion de las subcategorias basadas en las categorias seleccionadas y se guardan en "setSubCat"
  useEffect (() => {
    const fetchSubCat = async () => {
      const data = await Products.getSubCategories(products.cat)
      setSubCat(data)
    }

    fetchSubCat();
  }, [products.cat]);

  //Se llama la informacion con la API de los productos basados en las subcategorias seleccionadas y se guardan en "setProductFromSubCat"
  useEffect (() => {
    const fetchProduct = async () => {
      const data = await Products.getProductsBySubCategory(products.subcat)
      setProductFromSubCat(data)
    }
    
    fetchProduct();
  }, [products.subcat]);
  
  //Función para construir el nombre completo
  const generateName = (datosForm) => {
    //Se busca el producto seleccionado dentro de la lista de productos
    const foundProduct = productFromSubCat.find(
      (p) => String(p.id) === String(datosForm.product) || p.slug === datosForm.product
    );

    //Se busca el color seleccionado dentro de la lista de colores
    const foundColor = colors.find(
      (c) => String(c.id) === String(datosForm.color)
    );

    //Se busca la talla seleccionada dentro de la lista de tallas
    const foundSize = sizes.find(
      (s) => String(s.id) === String(datosForm.size)
    );

    //Aqui se extraen los nombres de los objetos encontrados y si aun no se ha llenado el <select>, se asigna null para que no se muestre nada en el nombre
    const nameProd = foundProduct ? foundProduct.name : null;
    const nameColor = foundColor ? foundColor.name : null;
    const nameSize = foundSize ? foundSize.name : null;

    //Se filtran las partes que no estén vacías y se unen con un espacio o guion
    const partes = [nameProd, nameColor, nameSize].filter(Boolean);
    return partes.join(' - ');
  };
       
  const handleChange = (e) => {
    const { name, value } = e.target;
    const onlyNumbers = value.replace(/[^0-9]/g, '');

    //Si el <select> se llama Parent entonces se mantiene la informacion previa guardando el valor de "cat" y se borra el valor de "subcat"
    if (name === 'parent') {
      setProducts((prev) => ({...prev, cat: value, subcat: ''}));
      //Se actualiza la informacion dentro del "formData" guardando la informacion previa y borrando el valor dentro de "product"
      setFormData((prev) => ({...prev, product: ''}));
      return;
    }

    //Si el <select> se llama Subcat entonces se mantiene la informacion previa guardando el valor de "subcat"
    if (name === 'subcat') {
      setProducts((prev) => ({...prev, subcat: value}));
      //Se actualiza la informacion dentro del "formData" guardando la informacion previa y borrando el valor dentro de "product"
      setFormData((prev) => ({...prev, product: ''}));
      return;
    }


    //Primero se procesa el valor del input "stock" para que solo contenga numeros y luego se actualiza el estado del formulario con los valores previos y el nuevo valor procesado. Si el input es "name", se genera un nombre en tiempo real basado en los valores actuales del formulario.
    setFormData((prev) => {
    const procesedValue = name === 'stock' ? onlyNumbers : value;

    const nuevoForm = {
      ...prev,
      [name]: procesedValue,
    };

    //Si el usuario escribe en el input "name", se mantiene el valor que el usuario ha escrito. Si no, se genera un nombre basado en los valores actuales del formulario. 
    if (name !== 'name') {
      nuevoForm.name = generateName(nuevoForm);
    }

    return nuevoForm;
  });
};

  useEffect(() => {
    console.log('Estado de products actualizado:', products);
    console.log('Formulario que se envia a la base de datos:', formData);
    
  }, [products, formData]);

  //Aqui se define el funcionamiento de la subida de informacion a la Base de Datos
  const handleSubmit = async (e) => {

    //Esto evita que la pagina se recarge por defecto al enviar el formulario
    e.preventDefault()

    //Se verifica si todos los campos del formulario han sido digitados
    if (!formData.product || !formData.color || !formData.size || !formData.stock || !formData.name) {
      alert('Completa todos los campos')
      return;
    }
    
    const payload = {
      ...formData,
      stock: parseInt(formData.stock)
    }
    //Aqui se hace la peticion de la API con el método POST especificando qué valores son enteros 
    try {

      const variant = await Products.saveVariant(payload);
      alert('¡¡Producto creado exitosamente!!')
      
      //Se resetean los estados del formulario tras ser guardado con exito
      setFormData({
        name: '',
        product: '',
        size: '',
        color: '',
        stock: ''
      })

      setProducts({
        cat: '',
        subcat: ''
      })
    } catch (error) {
      console.error('Error al enviar variante:', error);
    }
  }

  return(
    <div className ='w-full h-full flex justify-center items-center'>
      <form className='font-[Agdasima] text-xl w-full h-full py-30 px-20 flex justify-center items-center' onSubmit={handleSubmit}>
        <div className='flex flex-col w-1/3 h-1/2 flex items-center justify-center gap-8 border border-gray-300 rounded-xl shadow-md p-8'> 
          <label className='text-4xl font-bold py-8'>Formulario de Variantes</label>
          <div className='flex flex-col gap-6 w-full h-full'>
            <select name='parent' value={products.cat} onChange={handleChange} className={selectStyles}>
              <option value=''>
                {'Selecciona una categoría'}
              </option>
              {catParent.map((par) => (
                <option key={par.id} value={par.slug}> 
                  {par.name}
                </option>
              ))}
            </select>

            <select name='subcat' value={products.subcat} disabled={!products.cat} onChange={handleChange} className={selectStyles}>
              <option value=''>
                {!products.cat ? 'Primero elige una categoría' : 'Selecciona una subcategoria'}
              </option>
              {subCat.map((subcat) => (
                <option key={subcat.id} value={subcat.slug}> 
                  {subcat.name} ({subcat.slug})
                </option>
              ))}
            </select>

            <select name='product' value={formData.product} disabled={!products.subcat} onChange={handleChange} className={selectStyles}>
              <option value=''> 
                {!products.subcat ? 'Primero elige una subcategoría' : 'Selecciona un producto'}
              </option>
              {productFromSubCat.map((product) => (
                <option key={product.id} value={product.id}> 
                  {product.name} ({product.slug})
                </option>
              ))}
            </select>
      
            <select name='color' value={formData.color} onChange={handleChange} className={selectStyles}>
              <option value=''>
                {'Selecciona un color'}
              </option>
              {colors.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.name}
                </option>
              ))}
            </select>

            <select name='size' value={formData.size} onChange={handleChange} className={selectStyles}>
              <option value=''>
                {'Selecciona una talla'}
              </option>
              {sizes.map((siz) => (
                <option key={siz.id} value={siz.id}>
                  {siz.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className='flex flex-col gap-6 w-1/2 h-full'>
            <input name='stock' type='text' value={formData.stock} placeholder='Cantidad:' onChange={handleChange} className={inputStyles}/>
            <input name='name' type='text' value={formData.name} placeholder='Nombre:' onChange={handleChange} className={inputStyles}/> 
          </div>
          
          <button type='submit' className='bg-[#284631] text-white px-4 py-2 rounded-lg hover:bg-[#1e3525] transition-colors duration-300 w-1/3 shadow-md cursor-pointer'>
              Guardar Variante
          </button>
        </div>
      </form>
    </div>
  )
}