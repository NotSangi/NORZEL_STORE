import react from "react";
import api from "./axios.js";

//Constante que llama la informacion de los productos a traves de la API
export const getProducts = async () => {
  try {
    const response = await api.get('productos/items');
    return response.data;
  } catch (error) {
    console.error('error al obtener productos:', error);
  }
}

//Constante que llama la informacion de las categorias padre a traves de la API
export const getCategories = async () => {
  try {
    const response = await api.get('productos/categorias/?is_parent=true');
    return response.data;
  } catch (error) {
    console.error('Error al obtener categorias:', error);
    throw error;
  }
}

//Constante que llama la informacion de las subcategorias basadas en la categoria padre elegida a traves de la API
export const getSubCategories = async (slug) => {
  try {
    const response = await api.get(`productos/categorias/?parent=${slug}`);
    return response.data
  } catch (error) {
    console.error('Error al obtener subcategorías:', error);
    throw error;
  }
}

//Constante que realiza el metodo post para subir la informacion a la base de datos
export const saveProduct = async (data) => {
  try {
    const response = await api.post('productos/items/', data);
    return response.data
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
}

//Constante que llama la informacion de los colores a traves de la API
export const getColors = async () => {
  try {
    const response = await api.get('productos/colores/');
    return response.data;
  } catch (error) {
    console.error('error al obtener colores:', error);
  }
} 

//Constante que llama la informacion de las tallas a traves de la API
export const getSizes = async () => {
  try {
    const response = await api.get('productos/tallas/');
    return response.data;
  } catch (error) {
    console.error('error al obtener tallas:', error);
  }
}

export const getProductsBySubCategory = async (slug) => {
  try {
    const response = await api.get(`productos/items/?category=${slug}`);
    return response.data
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
}

export const saveVariant = async (data) => {
  try {
    const response = await api.post('productos/variantes/', data);
    return response.data
    alert("Variante creada correctamante")
  } catch (error) {
    console.error('Error al crear variante:', error);
    throw error;
  }
}