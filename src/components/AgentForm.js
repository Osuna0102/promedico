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
    <div className="form-container">
      <h2 className="form-heading">Formulario de Agente</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-box">
            <input
              type="text"
              name="cedula"
              placeholder="Cédula"
              value={formData.cedula}
              onChange={handleChange}
            />
          </div>
          <div className="form-box">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="form-button" type="submit">Registrar Agente</button>
      </form>
    </div>
  );
};

export default AgentForm;
