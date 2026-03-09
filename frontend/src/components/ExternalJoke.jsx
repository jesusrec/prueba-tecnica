import { useState } from 'react';
import api from '../api';

const ExternalJoke = () => {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      // Llamada al endpoint /external/joke de tu backend Java
      const response = await api.get('/external/joke');
      setJoke(response.data.value); 
    } catch (err) {
      setError("Error al conectar con la API de Chuck Norris.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.jokeContainer}>
      <h3 style={styles.jokeTitle}>API Externa: Chuck Norris Facts</h3>
      
      {/* Botón para obtener el chiste */}
      <button 
        onClick={fetchJoke} 
        disabled={loading} 
        style={loading ? {...styles.btnJoke, opacity: 0.6} : styles.btnJoke}
      >
        {loading ? 'BUSCANDO...' : 'OBTENER CHISTE'}
      </button>

      {/* Manejo de Loading, Error y Visualización de Texto */}
      <div style={styles.resultArea}>
        {loading && <p style={styles.statusText}>Conectando con el servidor...</p>}
        {error && <p style={styles.errorText}>{error}</p>}
        {joke && !loading && <p style={styles.jokeText}>"{joke}"</p>}
      </div>
    </div>
  );
};

const styles = {
  jokeContainer: {
    marginTop: '40px',
    padding: '25px',
    backgroundColor: '#111',
    borderRadius: '8px',
    border: '1px solid #333',
    textAlign: 'center'
  },
  jokeTitle: {
    fontSize: '16px',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '20px'
  },
  btnJoke: {
    backgroundColor: '#ffffff',
    color: '#000',
    border: 'none',
    padding: '10px 25px',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '15px'
  },
  resultArea: {
    minHeight: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  jokeText: {
    color: '#aaa',
    fontStyle: 'italic',
    fontSize: '15px',
    lineHeight: '1.5'
  },
  statusText: { color: '#666', fontSize: '14px' },
  errorText: { color: '#ff4d4d', fontSize: '14px' }
};

export default ExternalJoke;