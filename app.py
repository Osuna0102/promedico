from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS
import jwt

app = Flask(__name__)
CORS(app)  

# Conexión a MySQL
db = mysql.connector.connect(
    host="localhost",            # Host de la base de datos
    user="root",                 # Usuario de MySQL
    password="alejo123",         # Contraseña de MySQL
    database="company_inc"       # Nombre de la base de datos
)


# Secreto para firmar y verificar los tokens
SECRET_KEY = 'tu_secreto'  

@app.route('/')
def index():
    return "Welcome to the BackEnd API!" 

# Ruta para el inicio de sesión y generación de token JWT
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Verificar las credenciales del usuario en tu base de datos
    # Si las credenciales son válidas, genera un token JWT
    if data['username'] == 'usuario' and data['password'] == 'contraseña':
        token = jwt.encode({'username': data['username']}, SECRET_KEY, algorithm='HS256')
        return jsonify({'token': token}), 200
    else:
        return jsonify({'message': 'Credenciales inválidas'}), 401
    

# -------------------------------------------------------------------------------------
# Controladores para la gestión de clientes

# Ruta para registrar un cliente
@app.route('/api/customers', methods=['POST'])
def create_customer():
    data = request.get_json()
    cursor = db.cursor()
    cursor.execute("INSERT INTO customers (nombres, cedula, celular, direccion, ciudad_id) VALUES (%s, %s, %s, %s, %s)",
                   (data['nombres'], data['cedula'], data['celular'], data['direccion'], data['ciudad_id']))
    db.commit()
    cursor.close()
    return jsonify({'message': 'Cliente registrado exitosamente'}), 201

# Ruta para obtener la lista de clientes
@app.route('/api/customers', methods=['GET'])
def get_customers():
    cursor = db.cursor()
    cursor.execute("SELECT * FROM customers")
    customers = cursor.fetchall()
    cursor.close()
    return jsonify(customers), 200

# Ruta para obtener un cliente por ID
@app.route('/api/customers/<int:customer_id>', methods=['GET'])
def get_customer(customer_id):
    cursor = db.cursor()
    cursor.execute("SELECT * FROM customers WHERE id = %s", (customer_id,))
    customer = cursor.fetchone()
    cursor.close()
    if customer:
        return jsonify(customer), 200
    else:
        return jsonify({'message': 'Cliente no encontrado'}), 404

# Ruta para actualizar un cliente por ID
@app.route('/api/customers/<int:customer_id>', methods=['PUT'])
def update_customer(customer_id):
    data = request.get_json()
    cursor = db.cursor()
    cursor.execute("UPDATE customers SET nombres = %s, cedula = %s, celular = %s, direccion = %s, ciudad_id = %s WHERE id = %s",
                   (data['nombres'], data['cedula'], data['celular'], data['direccion'], data['ciudad_id'], customer_id))
    db.commit()
    cursor.close()
    return jsonify({'message': 'Cliente actualizado exitosamente'}), 200

# Ruta para eliminar un cliente por ID
@app.route('/api/customers/<int:customer_id>', methods=['DELETE'])
def delete_customer(customer_id):
    cursor = db.cursor()
    cursor.execute("DELETE FROM customers WHERE id = %s", (customer_id,))
    db.commit()
    cursor.close()
    return jsonify({'message': 'Cliente eliminado exitosamente'}), 200



# -------------------------------------------------------------------------------------
# Controladores para la gestión de agentes
# Ruta para registrar un agente
@app.route('/api/agents', methods=['POST'])
def create_agent():
    data = request.get_json()
    cursor = db.cursor()
    cursor.execute("INSERT INTO agents (cedula, nombre) VALUES (%s, %s)",
                   (data['cedula'], data['nombre']))
    db.commit()
    cursor.close()
    return jsonify({'message': 'Agente registrado exitosamente'}), 201

# Ruta para obtener la lista de agentes
@app.route('/api/agents', methods=['GET'])
def get_agents():
    cursor = db.cursor()
    cursor.execute("SELECT * FROM agents")
    agents = cursor.fetchall()
    cursor.close()
    return jsonify(agents), 200

# Ruta para obtener un agente por ID
@app.route('/api/agents/<int:agent_id>', methods=['GET'])
def get_agent(agent_id):
    cursor = db.cursor()
    cursor.execute("SELECT * FROM agents WHERE id = %s", (agent_id,))
    agent = cursor.fetchone()
    cursor.close()
    if agent:
        return jsonify(agent), 200
    else:
        return jsonify({'message': 'Agente no encontrado'}), 404

# Ruta para actualizar un agente por ID
@app.route('/api/agents/<int:agent_id>', methods=['PUT'])
def update_agent(agent_id):
    data = request.get_json()
    cursor = db.cursor()
    cursor.execute("UPDATE agents SET cedula = %s, nombre = %s WHERE id = %s",
                   (data['cedula'], data['nombre'], agent_id))
    db.commit()
    cursor.close()
    return jsonify({'message': 'Agente actualizado exitosamente'}), 200

# Ruta para eliminar un agente por ID
@app.route('/api/agents/<int:agent_id>', methods=['DELETE'])
def delete_agent(agent_id):
    cursor = db.cursor()
    cursor.execute("DELETE FROM agents WHERE id = %s", (agent_id,))
    db.commit()
    cursor.close()
    return jsonify({'message': 'Agente eliminado exitosamente'}), 200


# Ruta para asignar un agente a un cliente por sus respectivos IDs
@app.route('/api/customers/<int:customer_id>/assign_agent/<int:agent_id>', methods=['PUT'])
def assign_agent_to_customer(customer_id, agent_id):
    cursor = db.cursor()

    # Verificar si el cliente y el agente existen
    cursor.execute("SELECT COUNT(*) FROM customers WHERE id = %s", (customer_id,))
    customer_exists = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM agents WHERE id = %s", (agent_id,))
    agent_exists = cursor.fetchone()[0]

    if customer_exists == 0:
        cursor.close()
        return jsonify({'message': 'Cliente no encontrado'}), 404

    if agent_exists == 0:
        cursor.close()
        return jsonify({'message': 'Agente no encontrado'}), 404

    # Realizar la asignación actualizando el campo agente_id del cliente
    cursor.execute("UPDATE customers SET agente_id = %s WHERE id = %s", (agent_id, customer_id))
    db.commit()
    cursor.close()
    
    return jsonify({'message': 'Agente asignado al cliente exitosamente'}), 200


# Ruta para listar los clientes con sus respectivos agentes
@app.route('/api/customers-with-agents', methods=['GET'])
def get_customers_with_agents():
    cursor = db.cursor()
    cursor.execute("SELECT c.id, c.nombres, c.cedula, c.celular, c.direccion, c.ciudad_id, a.nombre AS agente_nombre FROM customers c LEFT JOIN agents a ON c.agente_id = a.id")
    customers_with_agents = cursor.fetchall()
    cursor.close()
    customers_with_agents_data = []
    
    for row in customers_with_agents:
        customer_data = {
            'id': row[0],
            'nombres': row[1],
            'cedula': row[2],
            'celular': row[3],
            'direccion': row[4],
            'ciudad_id': row[5],
            'agente_nombre': row[6] if row[6] else "Sin agente asignado"  # Maneja el caso cuando no hay agente asignado
        }
        customers_with_agents_data.append(customer_data)

    return jsonify(customers_with_agents_data), 200


if __name__ == '__main__':
    app.run(debug=True)
