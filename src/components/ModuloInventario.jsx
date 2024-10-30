import { useState, useEffect } from "react";

function ModuloInventario() {
  const [inventario, setInventario] = useState([]);
  const [mensajeExito, setMensajeExito] = useState("");
  const [nuevoInventario, setNuevoInventario] = useState({
    id_producto: "",
    id_almacen: "",
    stock_actual: "",
  });

  // Cargar la lista de inventario desde la API al montar el componente
  useEffect(() => {
    fetch("https://almacenes-p9m7.onrender.com/api/inventario")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar inventario");
        }
        return response.json();
      })
      .then((data) => setInventario(data))
      .catch((error) => console.error("Error al cargar inventario:", error));
  }, []);

  // Actualizar el estado con los valores de los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoInventario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para agregar una nueva entrada de inventario
  const handleAddInventario = () => {
    // Convertir los valores a tipo numérico antes de enviar la solicitud
    const dataToSend = {
      id_producto: parseInt(nuevoInventario.id_producto, 10),
      id_almacen: parseInt(nuevoInventario.id_almacen, 10),
      stock_actual: parseInt(nuevoInventario.stock_actual, 10),
    };

    // Validación para asegurar que los campos son números y están completos
    if (isNaN(dataToSend.id_producto) || isNaN(dataToSend.id_almacen) || isNaN(dataToSend.stock_actual)) {
      alert("Todos los campos deben ser números válidos.");
      return;
    }

    fetch("https://almacenes-p9m7.onrender.com/api/inventario", {
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
        // Actualizar la lista de inventario y limpiar el formulario
        setInventario([...inventario, data]);
        setNuevoInventario({
          id_producto: "",
          id_almacen: "",
          stock_actual: "",
        });
        setMensajeExito("AGREGADO CON EXITO");
        setTimeout(() => setMensajeExito(""), 3000);
      })
      .catch((error) => {
        console.error("Error al agregar inventario:", error);
        alert("Ocurrió un error al agregar el inventario. Verifica los datos e intenta nuevamente.");
      });
  };

  return (
    <div className="inventario-form">
      <h3 className="inventario-title">Control de Inventario</h3>
      {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>}
      <div className="form-group">
        <label>ID Producto</label>
        <input
          name="id_producto"
          placeholder="ID Producto"
          value={nuevoInventario.id_producto}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>ID Almacen</label>
        <input
          name="id_almacen"
          placeholder="ID Almacen"
          value={nuevoInventario.id_almacen}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Stock Actual</label>
        <input
          name="stock_actual"
          type="number"
          placeholder="Stock Actual"
          value={nuevoInventario.stock_actual}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddInventario} className="inventario-button">
        Agregar al Inventario
      </button>
      <ul>
        {inventario.map((item) => (
          <li key={`${item.id_producto}-${item.id_almacen}`}>
            Producto ID: {item.id_producto} - Almacén ID: {item.id_almacen} - Stock: {item.stock_actual}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ModuloInventario;
