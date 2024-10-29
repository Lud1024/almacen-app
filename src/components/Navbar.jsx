import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ userName, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-brand">Sistema de Gestión</div>
      <ul className="navbar-menu">
        <li>Módulo de Gestión de Productos</li>
        <li>Módulo de Gestión de Almacenes</li>
        <li>Módulo de Control de Inventario</li>
        <li>Módulo de Transacciones</li>
        <li>Módulo de Órdenes de Reabastecimiento</li>
        <li>Módulo de Notificaciones y Alertas</li>
      </ul>
      <div className="navbar-user">
        <span>Hola, {userName}</span>
        <button onClick={onLogout} className="logout-button">Salir</button>
      </div>
    </nav>
  );
}

export default Navbar;
