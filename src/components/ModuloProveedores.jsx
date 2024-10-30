import { useState, useEffect } from "react";

function ModuloProveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [mensajeExito, setMensajeExito] = useState("");
  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombre_proveedor: "",
    email: "",
    telefono: "",
    direccion: "",
  });

  useEffect(() => {
    fetch("https://almacenes-p9m7.onrender.com/api/proveedores")
      .then((response) => response.json())
      .then((data) => setProveedores(data))
      .catch((error) => console.error("Error al cargar proveedores:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProveedor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProveedor = () => {
    if (!nuevoProveedor.nombre_proveedor || !nuevoProveedor.email) {
      console.error("Todos los campos obligatorios deben completarse");
      return;
    }

    fetch("https://almacenes-p9m7.onrender.com/api/proveedores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoProveedor),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        setProveedores([...proveedores, data]);
        setNuevoProveedor({
          nombre_proveedor: "",
          email: "",
          telefono: "",
          direccion: "",
        });
        setMensajeExito("AGREGADO CON EXITO");
        setTimeout(() => setMensajeExito(""), 3000);
      })
      .catch((error) => console.error("Error al agregar proveedor:", error));
  };

  return (
    <div className="proveedores-form">
      <h3 className="proveedores-title">Gestión de Proveedores</h3>
      {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>}
      <div className="form-group">
        <label>Nombre del Proveedor</label>
        <input
          name="nombre_proveedor"
          placeholder="Nombre del Proveedor"
          value={nuevoProveedor.nombre_proveedor}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={nuevoProveedor.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Teléfono</label>
        <input
          name="telefono"
          placeholder="Teléfono"
          value={nuevoProveedor.telefono}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Dirección</label>
        <input
          name="direccion"
          placeholder="Dirección"
          value={nuevoProveedor.direccion}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddProveedor} className="proveedores-button">
        Agregar Proveedor
      </button>
      <ul>
        {proveedores.map((proveedor) => (
          <li key={proveedor.id_proveedor}>
            {proveedor.nombre_proveedor} - {proveedor.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ModuloProveedores;
