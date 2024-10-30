import Navbar from "../components/Navbar";
import ModuloProductos from "../components/ModuloProductos";
import "../styles/ProductosPage.css";

function ProductosPage() {
  return (
    <div>
      <Navbar userName="Administrador" onLogout={() => console.log("Logout")} />
      <ModuloProductos />
    </div>
  );
}

export default ProductosPage;
