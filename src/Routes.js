import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importa Routes y Route en lugar de Switch

import AgentList from './components/AgentList';
import AgentForm from './components/AgentForm';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';

const AppRoutes = () => { // Cambia el nombre de la función de Routes a AppRoutes
  return (
    <Routes>
      <Route path="/agents" element={<AgentList />} />
      <Route path="/agents/add" element={<AgentForm />} />
      <Route path="/customers" element={<CustomerList />} />
      <Route path="/customers/add" element={<CustomerForm />} />
      {/* Agrega rutas adicionales según sea necesario */}
    </Routes>
  );
};

export default AppRoutes;
