import { useState, useEffect } from "react";

function ModuloInventario() {
  const [inventario, setInventario] = useState([]);
  const [mensajeExito, setMensajeExito] = useState("");
  const [nuevoInventario, setNuevoInventario] = useState({
    id_producto: "",
    id_almacen: "",
    stock_actual: 0,
  });

  useEffect(() => {
    fetch("https://almacenes-p9m7.onrender.com/api/inventario")
      .then((response) => response.json())
      .then((data) => setInventario(data))
      .catch((error) => console.error("Error al cargar inventario:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoInventario((prev) => ({
      ...prev,
      [name]: name.includes("stock") ? parseInt(value) : value,
    }));
  };

  const handleAddInventario = () => {
    if (!nuevoInventario.id_producto || !nuevoInventario.id_almacen) {
      console.error("Todos los campos obligatorios deben completarse");
      return;
    }

    fetch("https://almacenes-p9m7.onrender.com/api/inventario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoInventario),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        setInventario([...inventario, data]);
        setNuevoInventario({
          id_producto: "",
          id_almacen: "",
          stock_actual: 0,
        });
        setMensajeExito("AGREGADO CON EXITO");
        setTimeout(() => setMensajeExito(""), 3000);
      })
      .catch((error) => console.error("Error al agregar inventario:", error));
  };

  return (
    <div className="inventario-form">
      <h3 className="inventario-title">Gestión de Inventario</h3>
      {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>}
      <div className="form-group">
        <label>ID Producto</label>
        <input name="id_producto" placeholder="ID Producto" value={nuevoInventario.id_producto} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>ID Almacen</label>
        <input name="id_almacen" placeholder="ID Almacen" value={nuevoInventario.id_almacen} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Stock Actual</label>
        <input name="stock_actual" type="number" placeholder="Stock Actual" value={nuevoInventario.stock_actual} onChange={handleInputChange} />
      </div>
      <button onClick={handleAddInventario} className="inventario-button">Agregar al Inventario</button>
    </div>
  );
}

export default ModuloInventario;
