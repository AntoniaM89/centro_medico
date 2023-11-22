from flask import Flask, request, jsonify
import mysql.connector
from werkzeug.security import  check_password_hash
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
cors = CORS(app, resources={r"/login": {"origins": "*"}})
cors = CORS(app, resources={r"/registrar": {"origins":"*"}})
cors = CORS(app, resources={r"/consulta_especialidad": {"origins":"*"}})
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="empleado"
)
db2=mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="Cliente"
)

cursor = db.cursor()
cursor2 =db2.cursor()
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    correo = data.get("correo")
    contrasena = data.get("contrasena")
    cursor.execute("SELECT correo, contrasena FROM Medico WHERE correo = %s and contrasena = %s ", (correo, contrasena))
    usuario_medico = cursor.fetchone()
    cursor.execute("SELECT correo, contrasena FROM Secretaria WHERE correo = %s and contrasena= %s", (correo, contrasena))
    usuario_secretario = cursor.fetchone()
    cursor2.execute("SELECT correo, contrasena FROM Cliente WHERE correo = %s and contrasena= %s", (correo, contrasena))
    usuario_usuario = cursor2.fetchone()
    if usuario_medico :
        print("sos medico")
        return jsonify({'message': 'Inicio de sesión exitoso', 'user_type': 'Medico','correo': correo, 'userExists': True})
    elif usuario_secretario :
        print("sos secretario")
        return jsonify({'message': 'Inicio de sesión exitoso', 'user_type': 'Secretaria','correo': correo, 'userExists': True})
    elif usuario_usuario :
        print("sos normal")
        return jsonify({'message': 'Inicio de sesión exitoso', 'user_type': 'Cliente','correo': correo, 'userExists': True})
    else:
        return jsonify({'message': 'Nombre de usuario no encontrado', 'userExists': False}, 401)
@app.route('/registrar', methods=['POST'])
def registrar():
    data = request.get_json()
    correo = data.get("correo")
    contrasena = data.get("contrasena")
    nombre = data.get("nombre")
    apellido= data.get("apellido")
    rut= data.get("rut")
    dominio = correo.split('@')[1]
    if dominio == 'galenos.com':
        cursor.execute("INSERT INTO empleado.secretaria (correo,contrasena,nombre,apellido,rut) VALUES (%s,%s,%s,%s, %s)", (correo, contrasena,nombre,apellido,rut))
        db.commit()
        return jsonify({'message': 'Registro exitoso en controlmedico'})
    else:
        cursor2.execute("INSERT INTO Cliente (correo,contrasena,nombre,apellido,rut) VALUES (%s,%s,%s,%s, %s)", (correo, contrasena,nombre,apellido,rut))
        db2.commit()
        return jsonify({'message': 'Registro exitoso en controlusuario'})
@app.route('/registrar_medico', methods=['POST'])
def registrar_medico():
    data = request.get_json()
    correo = data.get("correo")
    contrasena = data.get("contrasena")
    nombre = data.get("nombre")
    apellido= data.get("apellido")
    rut= data.get("rut")
    id_esp= data.get("id_esp")
    dominio = correo.split('@')[1]
    if dominio == 'galenosMED.com':
        cursor.execute("INSERT INTO Medico (correo,contrasena,nombre,apellido,rut, id_esp) VALUES (%s,%s,%s,%s, %s,%s)", (correo, contrasena,nombre,apellido,rut, id_esp))
        db.commit()
        return jsonify({'message': 'Registro exitoso en Medico'})
    else:
        return jsonify({'message': 'no cumple con el correo correspondiente al de un medico'})
@app.route('/registrar_especialidad', methods=['POST'])
def regitrar_especialidad():
    data = request.get_json()
    nombre = data.get("nombre")
    precio = data.get("precio")
    cursor.execute("Insert Into tipo_especialidad (nombre, precio) VALUES (%s,%s)",(nombre, precio))
    db.commit()
    return jsonify({'message': 'Registro exitoso'})
@app.route('/consulta_especialidad', methods=['GET'])
def consulta():
    cursor.execute("SELECT id_esp, nombre FROM tipo_especialidad ")
    resultados = cursor.fetchall()
    print (resultados)
    data = [{'id_esp':id_esp,'nombre': nombre } for id_esp, nombre in resultados]
    return jsonify(data)


if __name__ == '__main__':
    print("Servidor Flask iniciado correctamente")
    app.run(port="5001")
    