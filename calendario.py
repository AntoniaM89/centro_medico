from flask import Flask, jsonify, request
import mysql.connector
import calendar
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

CORS(app, resources={r"/guardar_hora": {"origins": "http://localhost:4200"}})
CORS(app, resources={r"/obtener_rut": {"origins": "http://localhost:4200"}})
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="SofiA.8989!.",
    database="controlmedico"
)

cursor = db.cursor()
    
cursor=db.cursor()
@app.route('/generar_calendario/<int:anio>/<int:mes>', methods=['GET'])
def generar_calendario(anio, mes):
        cal = calendar.Calendar()
        dias = list(cal.itermonthdays(anio, mes))
        calendario = [dias[i:i+7] for i in range(0, len(dias), 7)]
        return jsonify(calendario, anio, mes)
@app.route('/guardar_hora',methods=['POST'])
def guardar_hora():
    data = request.get_json()
    rut_medico = data.get('rut_medico')
    hora_inicio= data.get('hora_inicio')
    hora_final = data.get('hora_final')
    rut_cliente = data.get('rut_cliente')
    dia =data.get('dia')
    mes =data.get('mes')
    anio = data.get('anio') 
    cursor.execute("INSERT INTO gen_calendario ( rut_medico, hora_inicio, hora_final, rut_cliente, dia, mes, anno) VALUES (%s,%s,%s,%s,%s,%s,%s)",(rut_medico, hora_inicio, hora_final, rut_cliente,dia,mes,anio))
    db.commit()
    return jsonify ({'message':'hora creada'})
@app.route('/obtener_rut',methods=['GET'])
def obtener_rut():
    correo = request.args.get('correo') 
    cursor.execute("SELECT rut FROM control_medico WHERE correo = %s", (correo,))
    resultado = cursor.fetchone()
    if resultado:
        rut_medico = resultado[0]
        return jsonify({"rut": rut_medico})
    else:
        return jsonify({"error": "Médico no encontrado"})
if __name__ == '__main__':
    app.run(port='5002')
