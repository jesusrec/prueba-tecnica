import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Endpoint público en el Backend
      await axios.post("https://cuddly-goggles-j4r7xxvq6q9fp44j-8080.app.github.dev/users", form);
      alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
      navigate("/"); // Redirección al Login
    } catch (err) {
      alert("Error: El correo ya existe o el servidor no responde.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>REGISTRO</h2>
        <form onSubmit={handleRegister} style={styles.form}>
          <input 
            style={styles.input} 
            placeholder="Full Name" 
            onChange={e => setForm({...form, name: e.target.value})} 
            required 
          />
          <input 
            style={styles.input} 
            type="email" 
            placeholder="Email Address" 
            onChange={e => setForm({...form, email: e.target.value})} 
            required 
          />
          <input 
            style={styles.input} 
            type="password" 
            placeholder="Password" 
            onChange={e => setForm({...form, password: e.target.value})} 
            required 
          />
          <button type="submit" style={styles.btn}>CREAR CUENTA</button>
        </form>
        <Link to="/" style={styles.link}>¿YA TIENES CUENTA? INICIA SESIÓN</Link>
      </div>
    </div>
  );
};

const styles = {
  container: { height: "100vh", backgroundColor: "#000", display: "flex", justifyContent: "center", alignItems: "center" },
  card: { backgroundColor: "#0a0a0a", padding: "40px", borderRadius: "12px", border: "1px solid #1a1a1a", width: "380px", textAlign: "center" },
  title: { color: "#fff", marginBottom: "30px", letterSpacing: "3px", fontSize: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { backgroundColor: "#111", border: "1px solid #222", color: "#fff", padding: "14px", borderRadius: "6px", outline: "none" },
  btn: { backgroundColor: "#fff", color: "#000", fontWeight: "bold", padding: "14px", border: "none", borderRadius: "6px", cursor: "pointer", marginTop: "10px" },
  link: { color: "#444", display: "block", marginTop: "25px", fontSize: "11px", textDecoration: "none", letterSpacing: "1px" }
};

export default Register;