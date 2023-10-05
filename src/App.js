import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AgentForm from './components/AgentForm';
import AgentList from './components/AgentList';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import AssignAgent from './components/AssignAgent';
import ClientCustomerList from './components/ClientCustomerList';
import Login from './components/Login';
import ProtectedComponent from './components/ProtectedComponent';

function App() {
  const [token, setToken] = useState(null);

  function handleLogin(token) {
    setToken(token);
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {token ? ( // Mostrar enlaces solo si hay un token (inicio de sesión exitoso)
              <>
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
                  <Link to="/assign-agent">Asignar Agente</Link>
                </li>
                <li>
                  <Link to="/api/customers-with-agents">Listar Clientes y sus Agentes</Link>
                </li>
                <li>
                  <Link to="/protected">Página Protegida</Link>
                </li>
              </>
            ) : (
              // Si no hay un token, mostrar solo el enlace de inicio de sesión
              <li>
                <Link to="/login">Iniciar sesión</Link>
              </li>
            )}
          </ul>
        </nav>
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          {token && ( // Mostrar rutas protegidas si hay un token (inicio de sesión exitoso)
            <>
              <Route path="/agents" element={<AgentList />} />
              <Route path="/agents/add" element={<AgentForm />} />
              <Route path="/customers" element={<CustomerList />} />
              <Route path="/customers/add" element={<CustomerForm />} />
              <Route path="/assign-agent" element={<AssignAgent />} />
              <Route path="/api/customers-with-agents" element={<ClientCustomerList />} />
              <Route path="/protected" element={<ProtectedComponent />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
