import React, { useState } from 'react';
import axios from 'axios';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    cedula: '',
    celular: '',
    direccion: '',
    ciudad_id: '',
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
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Customer Form</h2>
      <div className="form-row">
        <div className="form-box">
          <input
            type="text"
            name="nombres"
            placeholder="Nombres"
            value={formData.nombres}
            onChange={handleChange}
          />
        </div>
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
            name="celular"
            placeholder="Celular"
            value={formData.celular}
            onChange={handleChange}
          />
        </div>
        <div className="form-box">
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={handleChange}
          />
        </div>
        <div className="form-box">
          <select
            name="ciudad_id"
            value={formData.ciudad_id}
            onChange={handleChange}
          >
            <option value="">Seleccione una ciudad</option>
            <option value="1">City A</option>
            <option value="2">City B</option>
            <option value="3">City C</option>
          </select>
        </div>
        <div className="form-box">
          <button
            className="form-button"
            type="submit"
          >
            Registrar Cliente
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
