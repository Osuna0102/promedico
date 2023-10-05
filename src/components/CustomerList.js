import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch the customer data from your API
    axios.get('http://localhost:5000/api/customers')
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);
      });
  }, []);

  const handleDelete = (customerId) => {
    // Implement the delete logic here and update the customers state
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
      <h2>Lista de Clientes</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer[0]}>
            Nombres: {customer[1]}, Cedula: {customer[2]}, Celular: {customer[3]}, Direccion: {customer[4]}, Ciudad ID: {customer[5]}
            <button onClick={() => handleDelete(customer[0])}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
