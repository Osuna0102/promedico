import React, { useState } from 'react';
import axios from 'axios';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    cedula: '',
    celular: '',
    direccion: '',
    ciudad_id: '', // Cambia a 'ciudad_id' en lugar de 'ciudad'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make a POST request to your API using Axios
    axios
      .post('http://localhost:5000/api/customers', formData)
      .then((response) => {
        console.log(response.data); // Handle the API response as needed
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Customer Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombres"
          placeholder="Nombres"
          value={formData.nombres}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cedula"
          placeholder="Cédula"
          value={formData.cedula}
          onChange={handleChange}
        />
        <input
          type="text"
          name="celular"
          placeholder="Celular"
          value={formData.celular}
          onChange={handleChange}
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleChange}
        />
        <select
          name="ciudad_id"
          value={formData.ciudad_id}
          onChange={handleChange}
        >
          <option value="">Seleccione una ciudad</option>
          <option value="1">City A</option>
          <option value="2">City B</option>
          <option value="3">City C</option>
          {/* Agrega las opciones de las ciudades según tu base de datos */}
        </select>
        <button type="submit">Registrar Cliente</button>
      </form>
    </div>
  );
};

export default CustomerForm;
