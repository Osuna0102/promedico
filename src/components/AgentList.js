import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom
import axios from 'axios';

const AgentList = () => {
  const location = useLocation(); // Get the current route location
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/agents');
        setAgents(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de agentes:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="route-heading">Lista de Agentes</h2>
      <table className="route-table">
        <thead>
          <tr>
            <th className="table-header">#</th>
            <th className="table-header">Cédula</th>
            <th className="table-header">Nombre</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent, index) => (
            <tr key={agent[0]}>
              <td className="table-data">{index + 1}</td>
              <td className="table-data">{agent[1]}</td>
              <td className="table-data">{agent[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentList;
