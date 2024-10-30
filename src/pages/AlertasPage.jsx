import Navbar from "../components/Navbar";
import ModuloAlertas from "../components/ModuloAlertas";
import "../styles/AlertasPage.css";

function AlertasPage() {
  return (
    <div className="alertas-container">
      <Navbar userName="Administrador" onLogout={() => console.log("Logout")} />
      <h2 className="alertas-title">Gestión de Alertas</h2>
      <ModuloAlertas />
    </div>
  );
}

export default AlertasPage;
