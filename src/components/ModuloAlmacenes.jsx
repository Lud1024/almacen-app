import { useState, useEffect } from "react";

function ModuloAlmacenes() {
  const [almacenes, setAlmacenes] = useState([]);
  const [mensajeExito, setMensajeExito] = useState("");
  const [nuevoAlmacen, setNuevoAlmacen] = useState({
    nombre_almacen: "",
    direccion: "",
    telefono_contacto: "",
  });

  useEffect(() => {
    fetch("https://almacenes-p9m7.onrender.com/api/almacenes")
      .then((response) => response.json())
      .then((data) => setAlmacenes(data))
      .catch((error) => console.error("Error al cargar almacenes:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoAlmacen((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAlmacen = () => {
    if (!nuevoAlmacen.nombre_almacen || !nuevoAlmacen.direccion) {
      console.error("Todos los campos obligatorios deben completarse");
      return;
    }

    fetch("https://almacenes-p9m7.onrender.com/api/almacenes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoAlmacen),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        setAlmacenes([...almacenes, data]);
        setNuevoAlmacen({
          nombre_almacen: "",
          direccion: "",
          telefono_contacto: "",
        });
        setMensajeExito("AGREGADO CON EXITO");
        setTimeout(() => setMensajeExito(""), 3000);
      })
      .catch((error) => console.error("Error al agregar almacén:", error));
  };

  return (
    <div className="almacenes-form">
      <h3 className="almacenes-title">Gestión de Almacenes</h3>
      {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>}
      <div className="form-group">
        <label>Nombre del Almacén</label>
        <input name="nombre_almacen" placeholder="Nombre del Almacén" value={nuevoAlmacen.nombre_almacen} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Dirección</label>
        <input name="direccion" placeholder="Dirección" value={nuevoAlmacen.direccion} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Teléfono de Contacto</label>
        <input name="telefono_contacto" placeholder="Teléfono de Contacto" value={nuevoAlmacen.telefono_contacto} onChange={handleInputChange} />
      </div>
      <button onClick={handleAddAlmacen} className="almacenes-button">Agregar Almacén</button>
    </div>
  );
}

export default ModuloAlmacenes;
