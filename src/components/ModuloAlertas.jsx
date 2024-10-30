import { useState, useEffect } from "react";

function ModuloAlertas() {
  const [alertas, setAlertas] = useState([]);
  const [mensajeExito, setMensajeExito] = useState("");
  const [nuevaAlerta, setNuevaAlerta] = useState({
    id_producto: "",
    id_almacen: "",
    tipo_alerta: "",
    estado_alerta: "",
  });

  useEffect(() => {
    fetch("https://almacenes-p9m7.onrender.com/api/alertas")
      .then((response) => response.json())
      .then((data) => setAlertas(data))
      .catch((error) => console.error("Error al cargar alertas:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaAlerta((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAlerta = () => {
    if (!nuevaAlerta.id_producto || !nuevaAlerta.tipo_alerta) {
      console.error("Todos los campos obligatorios deben completarse");
      return;
    }

    fetch("https://almacenes-p9m7.onrender.com/api/alertas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaAlerta),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        setAlertas([...alertas, data]);
        setNuevaAlerta({
          id_producto: "",
          id_almacen: "",
          tipo_alerta: "",
          estado_alerta: "",
        });
        setMensajeExito("AGREGADO CON EXITO");
        setTimeout(() => setMensajeExito(""), 3000);
      })
      .catch((error) => console.error("Error al agregar alerta:", error));
  };

  return (
    <div className="alertas-form">
      <h3 className="alertas-title">Gestión de Alertas</h3>
      {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>}
      <div className="form-group">
        <label>ID Producto</label>
        <input name="id_producto" placeholder="ID Producto" value={nuevaAlerta.id_producto} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>ID Almacen</label>
        <input name="id_almacen" placeholder="ID Almacen" value={nuevaAlerta.id_almacen} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Tipo de Alerta</label>
        <input name="tipo_alerta" placeholder="Tipo de Alerta" value={nuevaAlerta.tipo_alerta} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Estado de Alerta</label>
        <input name="estado_alerta" placeholder="Estado de Alerta" value={nuevaAlerta.estado_alerta} onChange={handleInputChange} />
      </div>
      <button onClick={handleAddAlerta} className="alertas-button">Agregar Alerta</button>
    </div>
  );
}

export default ModuloAlertas;
