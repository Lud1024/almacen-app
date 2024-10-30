import { useState, useEffect } from "react";

function ModuloTransacciones() {
  const [transacciones, setTransacciones] = useState([]);
  const [mensajeExito, setMensajeExito] = useState("");
  const [nuevaTransaccion, setNuevaTransaccion] = useState({
    id_producto: "",
    id_almacen: "",
    cantidad: "",
    tipo_transaccion: "Entrada",
    usuario_responsable: "",
  });

  // Cargar la lista de transacciones desde la API al montar el componente
  useEffect(() => {
    fetch("https://almacenes-p9m7.onrender.com/api/transacciones")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar transacciones");
        }
        return response.json();
      })
      .then((data) => setTransacciones(data))
      .catch((error) => console.error("Error al cargar transacciones:", error));
  }, []);

  // Actualizar el estado con los valores de los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaTransaccion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para agregar una nueva transacción
  const handleAddTransaccion = () => {
    // Convertir los valores a tipo numérico antes de enviar la solicitud
    const dataToSend = {
      id_producto: parseInt(nuevaTransaccion.id_producto, 10),
      id_almacen: parseInt(nuevaTransaccion.id_almacen, 10),
      cantidad: parseInt(nuevaTransaccion.cantidad, 10),
      tipo_transaccion: nuevaTransaccion.tipo_transaccion,
      usuario_responsable: nuevaTransaccion.usuario_responsable,
    };

    // Validación para asegurar que los campos son válidos y están completos
    if (
      isNaN(dataToSend.id_producto) ||
      isNaN(dataToSend.id_almacen) ||
      isNaN(dataToSend.cantidad) ||
      !dataToSend.tipo_transaccion ||
      !dataToSend.usuario_responsable
    ) {
      alert("Todos los campos deben ser completados correctamente.");
      return;
    }

    fetch("https://almacenes-p9m7.onrender.com/api/transacciones", {
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
        // Actualizar la lista de transacciones y limpiar el formulario
        setTransacciones([...transacciones, data]);
        setNuevaTransaccion({
          id_producto: "",
          id_almacen: "",
          cantidad: "",
          tipo_transaccion: "Entrada",
          usuario_responsable: "",
        });
        setMensajeExito("AGREGADO CON EXITO");
        setTimeout(() => setMensajeExito(""), 3000);
      })
      .catch((error) => {
        console.error("Error al agregar transacción:", error);
        alert("Ocurrió un error al agregar la transacción. Verifica los datos e intenta nuevamente.");
      });
  };

  return (
    <div className="transacciones-form">
      <h3 className="transacciones-title">Gestión de Transacciones</h3>
      {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>}
      <div className="form-group">
        <label>ID Producto</label>
        <input
          name="id_producto"
          placeholder="ID Producto"
          value={nuevaTransaccion.id_producto}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>ID Almacen</label>
        <input
          name="id_almacen"
          placeholder="ID Almacen"
          value={nuevaTransaccion.id_almacen}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Cantidad</label>
        <input
          name="cantidad"
          type="number"
          placeholder="Cantidad"
          value={nuevaTransaccion.cantidad}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Tipo de Transacción</label>
        <input
          name="tipo_transaccion"
          placeholder="Tipo de Transacción"
          value={nuevaTransaccion.tipo_transaccion}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Usuario Responsable</label>
        <input
          name="usuario_responsable"
          placeholder="Usuario Responsable"
          value={nuevaTransaccion.usuario_responsable}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddTransaccion} className="transacciones-button">
        Agregar Transacción
      </button>
      <ul>
        {transacciones.map((transaccion) => (
          <li key={`${transaccion.id_producto}-${transaccion.id_almacen}-${transaccion.usuario_responsable}`}>
            Producto ID: {transaccion.id_producto} - Almacén ID: {transaccion.id_almacen} - Cantidad: {transaccion.cantidad} - Tipo: {transaccion.tipo_transaccion} - Responsable: {transaccion.usuario_responsable}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ModuloTransacciones;
