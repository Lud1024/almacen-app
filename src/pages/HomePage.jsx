import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function HomePage() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el userId de la sesión
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      navigate("/"); // Redirige al login si no hay sesión activa
      return;
    }

    // Consultar la API para obtener el nombre del usuario
    //fetch(`https://almacenes-p9m7.onrender.com/api/usuarios/${userId}`)
    fetch(`http://localhost:300/api/usuarios/${userId}`)
      .then((response) => response.json())
      .then((data) => setUserName(data.name || "Usuario"))
      .catch((error) => console.error("Error al obtener el nombre:", error));
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("userId"); // Eliminar el userId de la sesión
    navigate("/"); // Redirigir al login
  };

  return (
    <div>
      <Navbar userName={userName} onLogout={handleLogout} />
      <main className="content">
        <h2>Bienvenido al Sistema de Gestión</h2>
        <p>Selecciona un módulo del menú para comenzar.</p>
      </main>
    </div>
  );
}

export default HomePage;
