import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      //const response = await fetch("https://almacenes-p9m7.onrender.com/api/usuarios/auth", {
        const response = await fetch("http://localhost:3000/api/usuarios/auth", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        sessionStorage.setItem("userId", data.id); // Guardar el ID del usuario en la sesión
        navigate("/home"); // Redirigir a HomePage
      } else {
        alert("Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
      alert("Error en el servidor");
    }
  };

  return (
    <div className="login-container">
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default LoginForm;
