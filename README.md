# Simple CRUD React using Python and Flask

This is a web application that allows to manage its customers and agents. It enables the registration of customers, assignment of agents to customers, listing of customers with their respective agents, and management of agents.

## Technologies Used

- **Backend:**
  - Python (Flask)
  - MySQL Database
  - Flask-CORS (for enabling Cross-Origin Resource Sharing)

- **Frontend:**
  - React 18.2.0
  - Node.js 18.18.0
  - npm 10.2.0

## Dependencies

### Backend (Python)

- Flask: Web framework for creating APIs in Python.
- mysql-connector-python: Python connector for MySQL database.
- Flask-CORS: Middleware for enabling CORS in Flask applications.

### Frontend (React)

- Axios: HTTP client for making API requests.
- react-router-dom: Library for handling routing in React applications.

## Prerequisites

Before running the project, ensure that you have the following installed:

- Python
- Node.js and npm
- MySQL Server

## Setup

### Backend

1. Create a MySQL database named `company_inc`.
2. Import the database schema using the SQL script provided in the `database.sql` file.
3. Install the required Python dependencies using pip:

```
pip install Flask mysql-connector-python Flask-CORS
```
Or use a the requriements.txt file with 
```
pip install -r requirements.txt
```
Open a terminal on the root folder and run Flask server:
```
python app.py
```
The Flask server will run at http://localhost:5000.

**_KEEP IT RUNNING_**

### Frontend
Open a terminal on the root folder and install the Node.js dependencies using npm:

```
npm install
```
```
npm start
```
The React application will run at http://localhost:3000.

**_KEEP IT RUNNING_**

## Usage
Make sure you have **both** the FrontEnd and BackEnd running simultaniously.

Access the web application by opening your browser and visiting http://localhost:3000.
### Features
Registration and management of customers.
Registration and management of agents.
Assignment of agents to customers.
Listing of customers with their respective agents.

License
This project is licensed under the MIT License. See the LICENSE file for details.
