import Navbar from "../components/Navbar";
import "../styles/HomePage.css";

function HomePage() {
  return (
    <div>
      <Navbar userName="Administrador" onLogout={() => console.log("Logout")} />
      <div className="home-container">
        <h2 className="home-welcome">Bienvenido al Sistema de Gestión</h2>
        <p className="home-message">
          Selecciona un módulo del menú para comenzar.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
