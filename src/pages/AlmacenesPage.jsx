import Navbar from "../components/Navbar";
import ModuloAlmacenes from "../components/ModuloAlmacenes";
import "../styles/AlmacenesPage.css";

function AlmacenesPage() {
  return (
    <div>
      <Navbar userName="Administrador" onLogout={() => console.log("Logout")} />
      <ModuloAlmacenes />
    </div>
  );
}

export default AlmacenesPage;
