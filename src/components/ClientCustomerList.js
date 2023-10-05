import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerListWithAgents = () => {
  const [customersWithAgents, setCustomersWithAgents] = useState([]);

  useEffect(() => {
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
      <h2 className="route-heading">Lista de Clientes con Agentes</h2>
      <table className="route-table">
        <thead>
          <tr>
            <th className="table-header">#.</th>
            <th className="table-header">Cliente</th>
            <th className="table-header">Cédula</th>
            <th className="table-header">Agente</th>
          </tr>
        </thead>
        <tbody>
          {customersWithAgents.map((customer, index) => (
            <tr key={customer.id}>
              <td className="table-data">{index + 1}</td>
              <td className="table-data">{customer.nombres}</td>
              <td className="table-data">{customer.cedula}</td>
              <td className="table-data">{customer.agente_nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerListWithAgents;
