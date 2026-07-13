import Boton from './components/Boton.jsx'

  function App() {
  return (
    <div>
      <Boton texto="Registrar" grosor='bold' />
      <Boton texto="Confirmar Contraseña" tamaño='md' />
      <Boton texto="Proceder al Pago" tamaño='lg' />
      <Boton texto="Volver al Inicio" tamaño='xl' />
    </div>
  );
}

export default App
