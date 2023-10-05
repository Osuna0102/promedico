import React, { useState } from 'react';
import axios from 'axios';

const AgentForm = () => {
  const [formData, setFormData] = useState({
    cedula: '',
    nombre: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make a POST request to create a new agent
    axios.post('http://localhost:5000/api/agents', formData)
      .then(() => {
        // Clear the form after a successful submission
        setFormData({
          cedula: '',
          nombre: '',
        });
      })
      .catch((error) => {
        console.error('Error al registrar el agente:', error);
      });
  };

  return (
    <div>
      <h2>Formulario de Agente</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="cedula"
          placeholder="Cédula"
          value={formData.cedula}
          onChange={handleChange}
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        <button type="submit">Registrar Agente</button>
      </form>
    </div>
  );
};

export default AgentForm;
