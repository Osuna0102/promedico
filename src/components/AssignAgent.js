import React, { useState } from 'react';
import axios from 'axios';

const AssignAgentForm = () => {
  const [agentId, setAgentId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [message, setMessage] = useState('');

  const handleAssignAgent = async () => {
    try {
      // Realizar la solicitud PUT al servidor Flask para asignar el agente al cliente
      await axios.put(`http://localhost:5000/api/customers/${customerId}/assign_agent/${agentId}`);
      setMessage('Agente asignado al cliente exitosamente');
    } catch (error) {
      setMessage('Error al asignar el agente al cliente');
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Asignar Agente a Cliente</h2>
      <div className="form-row">
        <div className="form-box">
          <label htmlFor="agentId">ID del Agente:</label>
          <input
            type="text"
            id="agentId"
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
          />
        </div>
        <div className="form-box">
          <label htmlFor="customerId">ID del Cliente:</label>
          <input
            type="text"
            id="customerId"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          />
        </div>
      </div>
      <button className="form-button" onClick={handleAssignAgent}>Asignar Agente</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AssignAgentForm;
