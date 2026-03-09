import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", credentials);
      localStorage.setItem("token", res.data.token);
      navigate("/users"); 
    } catch (err) {
      alert("Credenciales incorrectas.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>ACCESS PANEL</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input 
            style={styles.input} 
            type="email" 
            placeholder="Email" 
            onChange={e => setCredentials({...credentials, email: e.target.value})} 
          />
          <input 
            style={styles.input} 
            type="password" 
            placeholder="Password" 
            onChange={e => setCredentials({...credentials, password: e.target.value})} 
          />
          <button type="submit" style={styles.btn}>LOGIN</button>
        </form>
        <div style={styles.divider}>
            <p style={styles.text}>¿NUEVO AQUÍ?</p>
            <Link to="/register" style={styles.registerLink}>REGÍSTRATE AHORA</Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { height: "100vh", backgroundColor: "#000", display: "flex", justifyContent: "center", alignItems: "center" },
  card: { backgroundColor: "#0a0a0a", padding: "40px", borderRadius: "12px", border: "1px solid #1a1a1a", width: "350px", textAlign: "center" },
  title: { color: "#fff", marginBottom: "30px", letterSpacing: "4px" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { backgroundColor: "#111", border: "1px solid #222", color: "#fff", padding: "14px", borderRadius: "6px" },
  btn: { backgroundColor: "#fff", color: "#000", fontWeight: "bold", padding: "14px", border: "none", borderRadius: "6px", cursor: "pointer" },
  divider: { marginTop: "30px", borderTop: "1px solid #222", paddingTop: "20px" },
  text: { color: "#444", fontSize: "10px", marginBottom: "8px" },
  registerLink: { color: "#fff", textDecoration: "none", fontSize: "12px", fontWeight: "bold", borderBottom: "1px solid #fff" }
};

export default Login;