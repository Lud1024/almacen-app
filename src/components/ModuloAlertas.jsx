import { useState, useEffect } from "react";

function ModuloAlertas() {
  const [alertas, setAlertas] = useState([]);
  const [mensajeExito, setMensajeExito] = useState("");
  const [nuevaAlerta, setNuevaAlerta] = useState({
    id_producto: "",
    id_almacen: "",
    tipo_alerta: "Stock Bajo",
    estado_alerta: "Activa",
  });

  // Cargar la lista de alertas desde la API al montar el componente
  useEffect(() => {
    fetch("https://almacenes-p9m7.onrender.com/api/alertas")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar alertas");
        }
        return response.json();
      })
      .then((data) => setAlertas(data))
      .catch((error) => console.error("Error al cargar alertas:", error));
  }, []);

  // Actualizar el estado con los valores de los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaAlerta((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para agregar una nueva alerta
  const handleAddAlerta = () => {
    // Convertir los valores a tipo numérico antes de enviar la solicitud
    const dataToSend = {
      id_producto: parseInt(nuevaAlerta.id_producto, 10),
      id_almacen: parseInt(nuevaAlerta.id_almacen, 10),
      tipo_alerta: nuevaAlerta.tipo_alerta,
      estado_alerta: nuevaAlerta.estado_alerta,
    };

    // Validación para asegurar que los campos son válidos y están completos
    if (isNaN(dataToSend.id_producto) || isNaN(dataToSend.id_almacen) || !dataToSend.tipo_alerta || !dataToSend.estado_alerta) {
      alert("Todos los campos deben ser completados correctamente.");
      return;
    }

    fetch("https://almacenes-p9m7.onrender.com/api/alertas", {
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
        // Actualizar la lista de alertas y limpiar el formulario
        setAlertas([...alertas, data]);
        setNuevaAlerta({
          id_producto: "",
          id_almacen: "",
          tipo_alerta: "Stock Bajo",
          estado_alerta: "Activa",
        });
        setMensajeExito("AGREGADO CON EXITO");
        setTimeout(() => setMensajeExito(""), 3000);
      })
      .catch((error) => {
        console.error("Error al agregar alerta:", error);
        alert("Ocurrió un error al agregar la alerta. Verifica los datos e intenta nuevamente.");
      });
  };

  return (
    <div className="alertas-form">
      <h3 className="alertas-title">Gestión de Alertas</h3>
      {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>}
      <div className="form-group">
        <label>ID Producto</label>
        <input
          name="id_producto"
          placeholder="ID Producto"
          value={nuevaAlerta.id_producto}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>ID Almacen</label>
        <input
          name="id_almacen"
          placeholder="ID Almacen"
          value={nuevaAlerta.id_almacen}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Tipo de Alerta</label>
        <input
          name="tipo_alerta"
          placeholder="Tipo de Alerta"
          value={nuevaAlerta.tipo_alerta}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Estado de la Alerta</label>
        <input
          name="estado_alerta"
          placeholder="Estado de la Alerta"
          value={nuevaAlerta.estado_alerta}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddAlerta} className="alertas-button">
        Agregar Alerta
      </button>
      <ul>
        {alertas.map((alerta) => (
          <li key={`${alerta.id_producto}-${alerta.id_almacen}`}>
            Producto ID: {alerta.id_producto} - Almacén ID: {alerta.id_almacen} - Tipo: {alerta.tipo_alerta} - Estado: {alerta.estado_alerta}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ModuloAlertas;
