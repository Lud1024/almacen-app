import Navbar from "../components/Navbar";
import ModuloProveedores from "../components/ModuloProveedores";
import "../styles/ProveedoresPage.css";

function ProveedoresPage() {
  return (
    <div>
      <Navbar />
      <div className="page-content">
        <ModuloProveedores />
      </div>
    </div>
  );
}

export default ProveedoresPage;
