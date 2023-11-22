from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS
import calendar
app = Flask(__name__)
cors = CORS(app)
cors = CORS(app, resources={r"/login": {"origins": "*"}})
cors = CORS(app, resources={r"/registrar": {"origins":"*"}})

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="Empleado"
)
db2=mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="agenda"
)
db3=mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="Cliente"
)
cursor = db.cursor()
cursor2 =db2.cursor()
cursor3 =db3.cursor()
@app.route('/consultar_paciente', methods=['GET'])
def consultar_pacientes():
    cal = calendar.Calendar()
    cal = calendar.Calendar()
    dia = list(cal.Day(dia))
    mes = list(cal.Month(mes))
    data = request.get_json()
    dia = data.get("dia")
    mes = data.get("mes")
    correo = data.get("correo")
    cursor2.execute("SELECT dia, mes , hora_inicio, hora_final, rut_paciente FROM agenda WHERE dia = %s and mes = %s and correo = %s", (dia, mes, correo))
    pacientes= cursor2.fetchone()
    if pacientes:
        return jsonify({'message': 'Busqueda exitosa', 'user_type': 'agenda','dia':dia, 'userExists': True})
    else :
        return jsonify({'message': 'Busqueda no encontrada', 'userExists': False}, 401)
@app.route('/cambiar_estado', methods=['GET'])

def cambiar_estado():
    id_T = request.args.get('id_t')
    cursor2.execute("SELECT id_T, hora_inicio, hora_final, costo, descuento, dia, mes, anno, rut_medico, rut_paciente, cod_especialidad FROM hora_t WHERE id_T=%s", (id_T,))
    datos_origen = cursor2.fetchall()
    print(datos_origen)
    for fila in datos_origen:
        cursor2.execute("INSERT INTO agenda.hora_terminadas (id_T, hora_inicio, hora_final, costo, descuento, dia, mes, anno, rut_medico, rut_paciente, cod_especialidad) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", fila)
        db2.commit()
        cursor2.execute("DELETE FROM hora_t WHERE id_t = %s", (id_T,))
        db2.commit()
    return jsonify({'message': 'hora creada'})

#@app.router('/eliminar_consulta', methods=['POST'])
#def eliminar_consulta():
#    data = jsonify.get()
#    id_T = data.get('id_T')
#    cursor2 = db.cursor()
@app.route('/obtener_nombre',methods=['GET'])
def obtener_nombre():
    rut = request.args.get('rut') 
    cursor3.execute("SELECT nombre FROM Paciente WHERE rut = %s", (rut))
    resultado = cursor3.fetchone()
    if resultado:
        rut_paciente = resultado[0]
        return jsonify({"rut": rut_paciente})
    else:
        return jsonify({"error": "Paciente no encontrado"})
@app.route('/rut_medico/<correo>', methods=['GET'])
def rut(correo):
    cursor.execute("SELECT rut FROM medico WHERE correo = %s;", (correo,))
    resultado = cursor.fetchone()
    if resultado:
        rut = resultado[0]
        return jsonify({"rut": rut})
    else:
        return jsonify({"error": "usuario no encontrado"})

if __name__ == '__main__':
    app.run(port=5000)