import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgentList = () => {
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
      <h2>Lista de Agentes</h2>
      <ul>
        {agents.map((agent) => (
          <li key={agent[0]}>
            Cédula: {agent[1]}, Nombre: {agent[2]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentList;
