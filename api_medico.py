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
@app.route('/cambiar_estado', methods=['POST'])
def cambiar_estado():
    id_t = request.json.get('id_t')
    cursor2.execute("INSERT INTO hora_Terminada ( id_T,hora_inicio, hora_final,costo,descuento,dia,mes,anno, rut_medico, rut_cliente, cod_especialidad ) VALUES select * from hora_t")
    db2.commit()
    cursor2.execute("Delete from hora_t where id_t = %s", (id_t))
    return jsonify ({'message':'hora creada'})

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
if __name__ == '__main__':
    app.run(port=5000)