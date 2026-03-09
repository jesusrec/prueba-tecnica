import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import UserList from './pages/UserList';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal: Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Ruta protegida por token (el componente UserList debe manejar la carga) */}
        <Route path="/users" element={<UserList />} />

        {/* Redirección: Si entras a "/", te manda a "/login" */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Catch-all: Cualquier ruta no definida redirige al login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;