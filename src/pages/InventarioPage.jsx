import Navbar from "../components/Navbar";
import ModuloInventario from "../components/ModuloInventario";
import "../styles/InventarioPage.css";

function InventarioPage() {
  return (
    <div className="inventario-container">
      <Navbar userName="Administrador" onLogout={() => console.log("Logout")} />
      <h2 className="inventario-title">Control de Inventario</h2>
      <ModuloInventario />
    </div>
  );
}

export default InventarioPage;
