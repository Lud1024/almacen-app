import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ userName, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate("/home")}>Sistema de Gestión</div>
      <ul className="navbar-menu">
        <li onClick={() => navigate("/productos")}>Gestión de Productos</li>
        <li onClick={() => navigate("/almacenes")}>Gestión de Almacenes</li>
        <li onClick={() => navigate("/proveedores")}>Provedores</li>
        <li onClick={() => navigate("/inventario")}>Control de Inventario</li>
        <li onClick={() => navigate("/ordenes")}>Órdenes de Reabastecimiento</li>
        <li onClick={() => navigate("/alertas")}>Notificaciones y Alertas</li>
        <li onClick={() => navigate("/transacciones")}>Transacciones</li>
      </ul>
      <div className="navbar-user">
        <button onClick={onLogout} className="logout-button">Salir</button>
      </div>
    </nav>
  );
}

export default Navbar;
