import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AgentForm from './components/AgentForm';
import AgentList from './components/AgentList';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import AssignAgent from './components/AssignAgent';
import ClientCustomerList from './components/ClientCustomerList';
import Login from './components/Login';

function App() {
  const [token, setToken] = useState(null);

  function handleLogin(token) {
    setToken(token);
  }

  return (
    <Router>
      <div className="container">
        <div className="left-container">
          <nav>
            <ul>
              {token ? (
                <>
                  <li>
                    <Link to="/agents" className="route-button">Lista de Agentes</Link>
                  </li>
                  <li>
                    <Link to="/agents/add" className="route-button">Registrar Agente</Link>
                  </li>
                  <li>
                    <Link to="/customers" className="route-button">Lista de Customers</Link>
                  </li>
                  <li>
                    <Link to="/customers/add" className="route-button">Registrar Customer</Link>
                  </li>
                  <li>
                    <Link to="/assign-agent" className="route-button">Asignar Agente</Link>
                  </li>
                  <li>
                    <Link to="/customers-with-agents" className="route-button">Clientes y sus Agentes</Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login" className="route-button">Iniciar sesión</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div className="right-container">
          <Routes>
            <Route
              path="/login"
              element={<Login onLogin={handleLogin} />}
            />
            {token && (
              <>
                <Route path="/agents" element={<AgentList />} />
                <Route path="/agents/add" element={<AgentForm />} />
                <Route path="/customers" element={<CustomerList />} />
                <Route path="/customers/add" element={<CustomerForm />} />
                <Route path="/assign-agent" element={<AssignAgent />} />
                <Route path="/customers-with-agents" element={<ClientCustomerList />} />

              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
