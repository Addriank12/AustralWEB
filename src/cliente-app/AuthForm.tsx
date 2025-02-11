import React, { useEffect, useState } from "react";
import { AuthService } from "../Services/AuthService";
import { AuthResponse, Cliente } from "../Models/Cliente";


const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(localStorage.getItem("cliente"));
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      let response: AuthResponse;
      if (isLogin) {
        response = await AuthService.login(email, password);
      } else {
        const cliente: Cliente = {
          nombre,
          direccion,
          email,
          telefono,
          password,
        };
        response = await AuthService.register(cliente);
      }
      window.location.href = "/";


    } catch (err) {
      setError("Error al iniciar sesión o registrar. Verifica tus datos.");
      console.error(err);
    }
  };


  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Dirección</label>
                <input
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Teléfono</label>
                <input
                  type="text"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
            </>
          )}
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.submitButton}>
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </form>
        <p style={styles.switchText}>
          {isLogin ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={styles.switchButton}
          >
            {isLogin ? "Regístrate" : "Inicia Sesión"}
          </button>

          
        </p>
      </div>
      <button
            onClick={() => AuthService.logout()}
            style={styles.switchButton}
          >
            panic
          </button>
    </div>
  );
};

// Estilos
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f3f4f6", // Fondo gris claro
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "32px",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "24px",
    textAlign: "center" as const,
    color: "#1f2937", // Texto oscuro
  },
  error: {
    color: "#ef4444", // Rojo para errores
    marginBottom: "16px",
    textAlign: "center" as "center",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
  },
  formGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#4b5563", // Texto gris
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #d1d5db", // Borde gris
    fontSize: "14px",
    color: "#1f2937", // Texto oscuro
    backgroundColor: "#f9fafb", // Fondo gris claro
  },
  submitButton: {
    backgroundColor: "#3b82f6", // Azul
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "16px",
  },
  switchText: {
    textAlign: "center" as "center",
    marginTop: "16px",
    color: "#4b5563", // Texto gris
  },
  switchButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#3b82f6", // Azul
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: "14px",
  },
};

export default AuthForm;
