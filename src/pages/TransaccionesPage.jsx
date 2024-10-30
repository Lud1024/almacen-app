import Navbar from "../components/Navbar";
import ModuloTransacciones from "../components/ModuloTransacciones";
import "../styles/TransaccionesPage.css";

function TransaccionesPage() {
  return (
    <div>
      <Navbar userName="Administrador" onLogout={() => console.log("Logout")} />
      <ModuloTransacciones />
    </div>
  );
}

export default TransaccionesPage;
