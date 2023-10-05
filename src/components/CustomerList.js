import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/customers')
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);
      });
  }, []);

  const handleDelete = (customerId) => {
    axios.delete(`http://localhost:5000/api/customers/${customerId}`)
      .then(() => {
        setCustomers(customers.filter((customer) => customer[0] !== customerId));
      })
      .catch((error) => {
        console.error('Error deleting the customer:', error);
      });
  };

  return (
    <div>
      <h2 className="route-heading">Lista de Clientes</h2>
      <table className="route-table">
        <thead>
          <tr>
            <th className="table-header">#</th>
            <th className="table-header">Nombres</th>
            <th className="table-header">Cédula</th>
            <th className="table-header">Celular</th>
            <th className="table-header">Dirección</th>
            <th className="table-header">Ciudad ID</th>
            <th className="table-header">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer[0]}>
              <td className="table-data">{index + 1}</td>
              <td className="table-data">{customer[1]}</td>
              <td className="table-data">{customer[2]}</td>
              <td className="table-data">{customer[3]}</td>
              <td className="table-data">{customer[4]}</td>
              <td className="table-data">{customer[5]}</td>
              <td className="table-data">
                <button
                  className="delete-button"
                  onClick={() => handleDelete(customer[0])}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
