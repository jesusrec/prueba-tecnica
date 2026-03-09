// src/api.js
import axios from 'axios';

const api = axios.create({
  // Si estamos en localhost, usa localhost. Si no, usa la URL de Codespaces.
  baseURL: window.location.hostname === 'localhost' 
    ? 'http://localhost:8080' 
    : 'https://cuddly-goggles-j4r7xxvq6q9fp44j-8080.app.github.dev'
});

// Agregar el token automáticamente a todas las peticiones
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;