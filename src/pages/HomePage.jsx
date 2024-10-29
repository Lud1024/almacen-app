import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/HomePage.css"; // Importa los estilos de la página de inicio

function HomePage() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      navigate("/");
      return;
    }

    // Consultar la API para obtener el nombre del usuario
    //fetch(`https://almacenes-p9m7.onrender.com/api/usuarios/${userId}`)
    fetch(`http://localhost:300/api/usuarios/${userId}`)

      .then((response) => response.json())
      .then((data) => {
        if (data && data.nombre) {
          setUserName(data.nombre); // Ajusta esto según el campo que devuelve el nombre
        } else {
          setUserName("Usuario");
        }
      })
      .catch((error) => console.error("Error al obtener el nombre:", error));
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("userId"); // Eliminar el userId de la sesión
    navigate("/"); // Redirigir al login
  };

  return (
    <div>
      <Navbar userName={userName} onLogout={handleLogout} />
      <div className="home-container">
        <h2 className="home-welcome">Bienvenido al Sistema de Gestión</h2>
        <p className="home-message">
          Selecciona un módulo del menú para comenzar. Este sistema te permite
          gestionar productos, inventarios, órdenes de reabastecimiento, y mucho más.
          Navega por los módulos y explora todas las funcionalidades.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
