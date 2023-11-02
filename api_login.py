from flask import Flask, request, jsonify
import mysql.connector
from werkzeug.security import  check_password_hash
from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app, resources={r"/login": {"origins": "*"}})
cors = CORS(app, resources={r"/registrar": {"origins":"*"}})

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="SofiA.8989!.",
    database="controlmedico"
)
db2=mysql.connector.connect(
    host="localhost",
    user="root",
    password="SofiA.8989!.",
    database="controlusuario"
)

cursor = db.cursor()
cursor2 =db2.cursor()
@app.route('/login', methods=['POST'])
def login():
    data= request.get_json()
    correo = data.get("correo")
    contrasena =data.get("contrasena")
    
    cursor.execute("SELECT correo, contrasena FROM control_medico WHERE correo = %s", (correo,))
    usuario_medico = cursor.fetchone()

    cursor2.execute("SELECT correo, contrasena FROM control_usuario WHERE correo = %s", (correo,))
    usuario_usuario = cursor2.fetchone()
    if usuario_medico and check_password_hash(usuario_medico[1], contrasena):
        print("sos medico")
        return jsonify({'message': 'Inicio de sesión exitoso', 'user_type': 'control_medico'})
    elif usuario_usuario and check_password_hash(usuario_usuario[1], contrasena):
        print("sos normal")
        return jsonify({'message': 'Inicio de sesión exitoso', 'user_type': 'control_usuario'})
    else:
        return jsonify({'message': 'Nombre de usuario no encontrado'}, 401)
@app.route('/registrar', methods=['POST'])
def registrar():
    data = request.get_json()
    correo = data.get("correo")
    contrasena = data.get("contrasena")
    nombre = data.get("nombre")
    apellido= data.get("apellido")
    rut= data.get("rut")
    # Extraer el dominio del correo electrónico
    email_domain = correo.split('@')[1]

    if email_domain == 'galenos.com':
        # Guardar en la base de datos "controlmedico"

        cursor.execute("INSERT INTO control_medico (correo,contrasena,nombre,apellido,rut) VALUES (%s,%s,%s,%s, %s)", (correo, contrasena,nombre,apellido,rut))
        db.commit()
        return jsonify({'message': 'Registro exitoso en controlmedico'})
    else:
        # Guardar en la base de datos "controlusuario"

        cursor2.execute("INSERT INTO control_usuario (correo,contrasena,nombre,apellido,rut) VALUES (%s,%s,%s,%s, %s)", (correo, contrasena,nombre,apellido,rut))
        db2.commit()
        return jsonify({'message': 'Registro exitoso en controlusuario'})

if __name__ == '__main__':
    print("Servidor Flask iniciado correctamente")
    app.run(port="5001")
    