import { useState, useEffect } from "react";

function ModuloOrdenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [mensajeExito, setMensajeExito] = useState("");
  const [nuevaOrden, setNuevaOrden] = useState({
    id_proveedor: "",
    id_producto: "",
    cantidad_ordenada: 0,
    estado_orden: "",
  });

  useEffect(() => {
    fetch("https://almacenes-p9m7.onrender.com/api/ordenes")
      .then((response) => response.json())
      .then((data) => setOrdenes(data))
      .catch((error) => console.error("Error al cargar órdenes:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaOrden((prev) => ({
      ...prev,
      [name]: name === "cantidad_ordenada" ? parseInt(value) : value,
    }));
  };

  const handleAddOrden = () => {
    if (!nuevaOrden.id_proveedor || !nuevaOrden.id_producto) {
      console.error("Todos los campos obligatorios deben completarse");
      return;
    }

    fetch("https://almacenes-p9m7.onrender.com/api/ordenes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaOrden),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        setOrdenes([...ordenes, data]);
        setNuevaOrden({
          id_proveedor: "",
          id_producto: "",
          cantidad_ordenada: 0,
          estado_orden: "",
        });
        setMensajeExito("AGREGADO CON EXITO");
        setTimeout(() => setMensajeExito(""), 3000);
      })
      .catch((error) => console.error("Error al agregar orden:", error));
  };

  return (
    <div className="ordenes-form">
      <h3 className="ordenes-title">Gestión de Órdenes</h3>
      {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>}
      <div className="form-group">
        <label>ID Proveedor</label>
        <input name="id_proveedor" placeholder="ID Proveedor" value={nuevaOrden.id_proveedor} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>ID Producto</label>
        <input name="id_producto" placeholder="ID Producto" value={nuevaOrden.id_producto} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Cantidad Ordenada</label>
        <input name="cantidad_ordenada" type="number" placeholder="Cantidad Ordenada" value={nuevaOrden.cantidad_ordenada} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Estado de la Orden</label>
        <input name="estado_orden" placeholder="Estado de la Orden" value={nuevaOrden.estado_orden} onChange={handleInputChange} />
      </div>
      <button onClick={handleAddOrden} className="ordenes-button">Agregar Orden</button>
    </div>
  );
}

export default ModuloOrdenes;
