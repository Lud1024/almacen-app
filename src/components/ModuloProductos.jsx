import { useState, useEffect } from "react";

function ModuloProductos() {
  const [productos, setProductos] = useState([]);
  const [mensajeExito, setMensajeExito] = useState(""); // Estado para el mensaje de éxito
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: "",
    codigo_barras: "",
    descripcion: "",
    categoria: "",
    stock_actual: 0,
    stock_minimo: 0,
    precio_unitario: 0.0,
  });

  useEffect(() => {
    fetch("https://almacenes-p9m7.onrender.com/api/productos")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({
      ...prev,
      [name]: name === "precio_unitario" || name.includes("stock") ? parseFloat(value) : value,
    }));
  };

  const handleAddProducto = () => {
    if (!nuevoProducto.nombre_producto || !nuevoProducto.codigo_barras) {
      console.error("Todos los campos obligatorios deben completarse");
      return;
    }

    fetch("https://almacenes-p9m7.onrender.com/api/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoProducto),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        setProductos([...productos, data]);
        setNuevoProducto({
          nombre_producto: "",
          codigo_barras: "",
          descripcion: "",
          categoria: "",
          stock_actual: 0,
          stock_minimo: 0,
          precio_unitario: 0.0,
        }); // Limpiar campos
        setMensajeExito("AGREGADO CON EXITO"); // Mostrar mensaje de éxito
        setTimeout(() => setMensajeExito(""), 3000); // Ocultar mensaje después de 3 segundos
      })
      .catch((error) => console.error("Error al agregar producto:", error));
  };

  return (
    <div className="productos-form">
      <h3 className="productos-title">Gestión de Productos</h3>
      {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>} {/* Mostrar mensaje de éxito */}
      <div className="form-group">
        <label>Nombre del Producto</label>
        <input
          name="nombre_producto"
          placeholder="Nombre del Producto"
          value={nuevoProducto.nombre_producto}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Código de Barras</label>
        <input
          name="codigo_barras"
          placeholder="Código de Barras"
          value={nuevoProducto.codigo_barras}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <input
          name="descripcion"
          placeholder="Descripción"
          value={nuevoProducto.descripcion}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Categoría</label>
        <input
          name="categoria"
          placeholder="Categoría"
          value={nuevoProducto.categoria}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Stock Actual</label>
        <input
          name="stock_actual"
          type="number"
          placeholder="Stock Actual"
          value={nuevoProducto.stock_actual}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Stock Mínimo</label>
        <input
          name="stock_minimo"
          type="number"
          placeholder="Stock Mínimo"
          value={nuevoProducto.stock_minimo}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Precio Unitario</label>
        <input
          name="precio_unitario"
          type="number"
          placeholder="Precio Unitario"
          value={nuevoProducto.precio_unitario}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddProducto} className="productos-button">
        Agregar Producto
      </button>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id_producto}>
            {producto.nombre_producto} - {producto.categoria}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ModuloProductos;
