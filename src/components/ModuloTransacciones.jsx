import { useState, useEffect } from "react";

function ModuloTransacciones() {
  const [transacciones, setTransacciones] = useState([]);
  const [mensajeExito, setMensajeExito] = useState("");
  const [nuevaTransaccion, setNuevaTransaccion] = useState({
    id_producto: "",
    id_almacen: "",
    cantidad: 0,
    tipo_transaccion: "",
    usuario_responsable: "",
  });

  useEffect(() => {
    fetch("https://almacenes-p9m7.onrender.com/api/transacciones")
      .then((response) => response.json())
      .then((data) => setTransacciones(data))
      .catch((error) => console.error("Error al cargar transacciones:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaTransaccion((prev) => ({
      ...prev,
      [name]: name === "cantidad" ? parseInt(value) : value,
    }));
  };

  const handleAddTransaccion = () => {
    if (!nuevaTransaccion.id_producto || !nuevaTransaccion.tipo_transaccion) {
      console.error("Todos los campos obligatorios deben completarse");
      return;
    }

    fetch("https://almacenes-p9m7.onrender.com/api/transacciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaTransaccion),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        setTransacciones([...transacciones, data]);
        setNuevaTransaccion({
          id_producto: "",
          id_almacen: "",
          cantidad: 0,
          tipo_transaccion: "",
          usuario_responsable: "",
        });
        setMensajeExito("AGREGADO CON EXITO");
        setTimeout(() => setMensajeExito(""), 3000);
      })
      .catch((error) => console.error("Error al agregar transacción:", error));
  };

  return (
    <div className="transacciones-form">
      <h3 className="transacciones-title">Gestión de Transacciones</h3>
      {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>}
      <div className="form-group">
        <label>ID Producto</label>
        <input name="id_producto" placeholder="ID Producto" value={nuevaTransaccion.id_producto} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>ID Almacen</label>
        <input name="id_almacen" placeholder="ID Almacen" value={nuevaTransaccion.id_almacen} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Cantidad</label>
        <input name="cantidad" type="number" placeholder="Cantidad" value={nuevaTransaccion.cantidad} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Tipo de Transacción</label>
        <input name="tipo_transaccion" placeholder="Tipo de Transacción" value={nuevaTransaccion.tipo_transaccion} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Usuario Responsable</label>
        <input name="usuario_responsable" placeholder="Usuario Responsable" value={nuevaTransaccion.usuario_responsable} onChange={handleInputChange} />
      </div>
      <button onClick={handleAddTransaccion} className="transacciones-button">Agregar Transacción</button>
    </div>
  );
}

export default ModuloTransacciones;
