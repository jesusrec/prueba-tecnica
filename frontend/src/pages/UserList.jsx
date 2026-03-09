import { useEffect, useState } from "react";
import api from "../api";
import ExternalJoke from "../components/ExternalJoke";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ id: null, name: "", email: "", password: "" });
  const [isEditing, setIsEditing] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/users");
      setUsers(response.data);
      setError("");
    } catch (err) {
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.name.trim().length < 3) return "El nombre debe tener al menos 3 caracteres.";
    if (!emailRegex.test(form.email)) return "El formato del email no es válido.";
    if (!isEditing && form.password.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      if (isEditing) {
        await api.put(`/users/${form.id}`, form);
      } else {
        await api.post("/users", form);
      }
      setForm({ id: null, name: "", email: "", password: "" });
      setIsEditing(false);
      fetchUsers();
    } catch (err) {
      alert("Error al procesar la solicitud. Revisa si el email ya existe.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Confirmas la eliminación de este registro?")) {
      try {
        await api.delete(`/users/${id}`);
        fetchUsers();
      } catch (err) {
        alert("No se pudo eliminar el usuario.");
      }
    }
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setForm({ id: user.id, name: user.name, email: user.email, password: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={styles.container}>
      <div style={styles.centeredWrapper}>
        
        <div style={styles.topBar}>
          <h2 style={styles.title}>Panel Central</h2>
          <button onClick={handleLogout} style={styles.btnLogout}>CERRAR SESIÓN</button>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>{isEditing ? "MODIFICAR REGISTRO" : "NUEVO USUARIO"}</h3>
          <form onSubmit={handleSubmit} style={styles.formGrid}>
            <input
              style={styles.input}
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              style={styles.input}
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {!isEditing && (
              <input
                style={styles.input}
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            )}
            <div style={styles.formActions}>
              <button type="submit" style={styles.btnPrimary}>
                {isEditing ? "ACTUALIZAR DATOS" : "GUARDAR USUARIO"}
              </button>
              {isEditing && (
                <button 
                  type="button" 
                  onClick={() => { setIsEditing(false); setForm({id:null, name:"", email:"", password:""})}} 
                  style={styles.btnSecondary}
                >
                  CANCELAR
                </button>
              )}
            </div>
          </form>
        </div>
        <div style={styles.tableCard}>
          {loading ? (
            <p style={styles.statusText}>Actualizando base de datos...</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr style={styles.thRow}>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} style={styles.tr}>
                    <td style={styles.td}>{user.name}</td>
                    <td style={styles.td}>{user.email}</td>
                    <td style={styles.td}>
                      <button onClick={() => handleEdit(user)} style={styles.btnEdit}>EDITAR</button>
                      <button onClick={() => handleDelete(user.id)} style={styles.btnDelete}>BORRAR</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <ExternalJoke />

      </div>
    </div>
  );
};

const styles = {
container: {
    minHeight: "100vh",
    width: "100vw", 
    backgroundColor: "#000",
    color: "#fff",
    display: "flex",
    justifyContent: "center", 
    padding: "60px 0", 
    boxSizing: "border-box",
  },
  centeredWrapper: {
    width: "90%", 
    maxWidth: "1200px", 
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    margin: "0 auto", 
  },
  topBar: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    borderBottom: "1px solid #222",
    paddingBottom: "20px"
  },
  title: { fontSize: "22px", letterSpacing: "2px", textTransform: "uppercase", borderLeft: "5px solid #fff", paddingLeft: "15px" },
  btnLogout: { background: "none", border: "1px solid #ff4d4d", color: "#ff4d4d", padding: "8px 16px", cursor: "pointer", borderRadius: "4px", fontSize: "12px", transition: "0.3s" },
  
  card: { backgroundColor: "#0a0a0a", padding: "30px", borderRadius: "8px", border: "1px solid #1a1a1a" },
  cardTitle: { fontSize: "12px", color: "#444", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px" },
  formGrid: { display: "flex", flexDirection: "column", gap: "12px" },
  input: { backgroundColor: "#111", border: "1px solid #222", color: "#fff", padding: "12px", borderRadius: "4px", outline: "none", fontSize: "14px" },
  formActions: { display: "flex", gap: "10px", marginTop: "10px" },
  btnPrimary: { backgroundColor: "#fff", color: "#000", border: "none", padding: "12px 25px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer", flex: 1 },
  btnSecondary: { backgroundColor: "#222", color: "#fff", border: "none", padding: "12px 25px", borderRadius: "4px", cursor: "pointer" },

  tableCard: { backgroundColor: "#0a0a0a", borderRadius: "8px", border: "1px solid #1a1a1a", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  thRow: { backgroundColor: "#111" },
  th: { textAlign: "left", padding: "18px 20px", fontSize: "11px", color: "#444", textTransform: "uppercase", letterSpacing: "1px" },
  tr: { borderBottom: "1px solid #151515", transition: "0.2s" },
  td: { padding: "18px 20px", fontSize: "14px", color: "#ccc" },
  btnEdit: { color: "#4da6ff", background: "none", border: "none", cursor: "pointer", marginRight: "15px", fontWeight: "600" },
  btnDelete: { color: "#ff4d4d", background: "none", border: "none", cursor: "pointer", fontWeight: "600" },
  statusText: { color: "#444", padding: "40px", textAlign: "center", fontStyle: "italic" }
};

export default UserList;