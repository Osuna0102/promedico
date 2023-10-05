import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AgentForm from './components/AgentForm';
import AgentList from './components/AgentList';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import AssignAgent from './components/AssignAgent'; // Importa el nuevo componente
import ClientCustomerList from './components/ClientCustomerList'; // Importa el nuevo componente

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/agents">Lista de Agentes</Link>
            </li>
            <li>
              <Link to="/agents/add">Registrar Agente</Link>
            </li>
            <li>
              <Link to="/customers">Lista de Customers</Link>
            </li>
            <li>
              <Link to="/customers/add">Registrar Customer</Link>
            </li>
            <li>
              <Link to="/assign-agent">Asignar Agente</Link> {/* Nueva ruta */}
            </li>            <li>
              <Link to="/api/customers-with-agents">Listar Clientes y sus Agentes</Link> {/* Nueva ruta */}
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/agents" element={<AgentList />} />
          <Route path="/agents/add" element={<AgentForm />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/add" element={<CustomerForm />} />
          <Route path="/assign-agent" element={<AssignAgent />} /> {/* Nueva ruta */}
          <Route path="/api/customers-with-agents" element={<ClientCustomerList />} /> {/* Nueva ruta */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
