import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProductosPage from "./pages/ProductosPage";
import AlmacenesPage from "./pages/AlmacenesPage";
import ProveedoresPage from "./pages/ProveedoresPage";
import InventarioPage from "./pages/InventarioPage";
import OrdenesPage from "./pages/OrdenesPage";
import AlertasPage from "./pages/AlertasPage";
import TransaccionesPage from "./pages/TransaccionesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/almacenes" element={<AlmacenesPage />} />
        <Route path="/proveedores" element={<ProveedoresPage />} />
        <Route path="/inventario" element={<InventarioPage />} />
        <Route path="/ordenes" element={<OrdenesPage />} />
        <Route path="/alertas" element={<AlertasPage />} />
        <Route path="/transacciones" element={<TransaccionesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
