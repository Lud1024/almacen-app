import { useState, useEffect } from "react";

function ModuloOrdenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [mensajeExito, setMensajeExito] = useState("");
  const [nuevaOrden, setNuevaOrden] = useState({
    id_proveedor: "",
    id_producto: "",
    cantidad_ordenada: "",
    estado_orden: "Pendiente",
  });

  // Cargar la lista de órdenes desde la API al montar el componente
  useEffect(() => {
    fetch("https://almacenes-p9m7.onrender.com/api/ordenes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar órdenes");
        }
        return response.json();
      })
      .then((data) => setOrdenes(data))
      .catch((error) => console.error("Error al cargar órdenes:", error));
  }, []);

  // Actualizar el estado con los valores de los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaOrden((prev) => ({
      ...prev,
      [name]: name === "cantidad_ordenada" ? parseInt(value, 10) : value,
    }));
  };

  // Función para agregar una nueva orden
  const handleAddOrden = () => {
    // Convertir los valores a tipo numérico antes de enviar la solicitud
    const dataToSend = {
      id_proveedor: parseInt(nuevaOrden.id_proveedor, 10),
      id_producto: parseInt(nuevaOrden.id_producto, 10),
      cantidad_ordenada: parseInt(nuevaOrden.cantidad_ordenada, 10),
      estado_orden: nuevaOrden.estado_orden,
    };

    // Validación para asegurar que los campos son números y están completos
    if (
      isNaN(dataToSend.id_proveedor) ||
      isNaN(dataToSend.id_producto) ||
      isNaN(dataToSend.cantidad_ordenada) ||
      !dataToSend.estado_orden
    ) {
      alert("Todos los campos deben ser completados correctamente.");
      return;
    }

    fetch("https://almacenes-p9m7.onrender.com/api/ordenes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        // Actualizar la lista de órdenes y limpiar el formulario
        setOrdenes([...ordenes, data]);
        setNuevaOrden({
          id_proveedor: "",
          id_producto: "",
          cantidad_ordenada: "",
          estado_orden: "Pendiente",
        });
        setMensajeExito("AGREGADO CON EXITO");
        setTimeout(() => setMensajeExito(""), 3000);
      })
      .catch((error) => {
        console.error("Error al agregar orden:", error);
        alert("Ocurrió un error al agregar la orden. Verifica los datos e intenta nuevamente.");
      });
  };

  return (
    <div className="ordenes-form">
      <h3 className="ordenes-title">Gestión de Órdenes</h3>
      {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>}
      <div className="form-group">
        <label>ID Proveedor</label>
        <input
          name="id_proveedor"
          placeholder="ID Proveedor"
          value={nuevaOrden.id_proveedor}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>ID Producto</label>
        <input
          name="id_producto"
          placeholder="ID Producto"
          value={nuevaOrden.id_producto}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Cantidad Ordenada</label>
        <input
          name="cantidad_ordenada"
          type="number"
          placeholder="Cantidad Ordenada"
          value={nuevaOrden.cantidad_ordenada}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Estado de la Orden</label>
        <input
          name="estado_orden"
          placeholder="Estado de la Orden"
          value={nuevaOrden.estado_orden}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddOrden} className="ordenes-button">
        Agregar Orden
      </button>
      <ul>
        {ordenes.map((orden) => (
          <li key={`${orden.id_proveedor}-${orden.id_producto}`}>
            Proveedor ID: {orden.id_proveedor} - Producto ID: {orden.id_producto} - Cantidad: {orden.cantidad_ordenada} - Estado: {orden.estado_orden}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ModuloOrdenes;
