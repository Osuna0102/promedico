import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerListWithAgents = () => {
  const [customersWithAgents, setCustomersWithAgents] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET a la nueva ruta en tu servidor Flask
    axios.get('http://localhost:5000/api/customers-with-agents')
      .then((response) => {
        setCustomersWithAgents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customer data with agents:', error);
      });
  }, []);

  return (
    <div>
      <h2>Lista de Clientes con Agentes</h2>
      <ul>
        {customersWithAgents.map((customer) => (
          <li key={customer.id}>
            <strong>Cliente:</strong> {customer.nombres}, <strong>Cédula:</strong> {customer.cedula}, <strong>Agente:</strong> {customer.agente_nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerListWithAgents;
