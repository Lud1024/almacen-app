import Navbar from "../components/Navbar";
import ModuloOrdenes from "../components/ModuloOrdenes";
import "../styles/OrdenesPage.css";

function OrdenesPage() {
  return (
    <div className="ordenes-container">
      <Navbar userName="Administrador" onLogout={() => console.log("Logout")} />
      <h2 className="ordenes-title">Gestión de Órdenes de Reabastecimiento</h2>
      <ModuloOrdenes />
    </div>
  );
}

export default OrdenesPage;
