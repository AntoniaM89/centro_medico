from flask import Flask, jsonify, request
import mysql.connector
import calendar
from flask_cors import CORS
from datetime import date
app = Flask(__name__)
CORS(app)

CORS(app, resources={r"/guardar_hora": {"origins": "http://localhost:4200"}})
CORS(app, resources={r"/obtener_rut": {"origins": "http://localhost:4200"}})
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="Agenda"
)

cursor = db.cursor()
db2 = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="Empleado"
)

cursor2=db2.cursor()
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
    cod_especialidad = data.get('cod_especialidad')
    dia =data.get('dia')
    mes =data.get('mes')
    anno = data.get('anno') 
    cursor.execute("INSERT INTO hora_t ( hora_inicio, hora_final,costo,descuento,dia,mes,anno, rut_medico, rut_paciente, cod_especialidad ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s )",(hora_inicio, hora_final,0,0,dia,mes,anno, rut_medico, rut_cliente, cod_especialidad))
    db.commit()
    return jsonify ({'message':'hora creada'})
@app.route('/obtener_rut', methods=['GET'])
def obtener_rut():
    rut = request.args.get('rut') 
    cursor.execute("SELECT id_T, hora_inicio, hora_final, costo, descuento, dia||'/'||mes||'/'||anno fecha FROM hora_t where rut_medico = %s", (rut,))
    resultado = cursor.fetchone()

    if resultado:
        data = [{'me.rut': resultado[0], 'me.nombre': resultado[1], 'me.apellido': resultado[2], 'tp.nombre': resultado[3], 'me.id_esp': resultado[4]}]
        return jsonify(data)
    else:
        return jsonify({'error': 'No se encontró ningún médico con el RUT proporcionado'}), 404

@app.route('/obtener_rut_medico', methods=['GET'])
def obtener_rut_medico():
    rut = request.args.get('rut') 
    cursor2.execute("SELECT me.rut, me.nombre, me.apellido ,tp.nombre ,me.id_esp FROM medico me join tipo_especialidad tp on me.id_esp=tp.id_esp where rut = %s", (rut,))
    resultado = cursor2.fetchone()

    if resultado:
        data = [{'me.rut': resultado[0], 'me.nombre': resultado[1], 'me.apellido': resultado[2], 'tp.nombre': resultado[3], 'me.id_esp': resultado[4]}]
        return jsonify(data)
    else:
        return jsonify({'error': 'No se encontró ningún médico con el RUT proporcionado'}), 404
    
@app.route('/fecha_actual', methods=['GET'])
def fecha_actual():
    data = request.get_json()
    dia = data.get('dia')
    mes = data.get('mes')
    anno = data.get('anno')
    rut_medico = data.get('rut_medico')
    cursor.execute("SELECT id_T, hora_inicio, hora_final, costo, CONCAT(dia,'/',mes,'/',anno) as fecha FROM hora_t WHERE dia = %s AND mes = %s AND anno = %s AND rut_medico = %s order by hora_inicio", (dia, mes, anno, rut_medico))
    resultados = cursor.fetchall()
    if resultados:
        data = []
        for resultado in resultados:
            data.append({
                'id_T': resultado[0],
                'hora_inicio': resultado[1],
                'hora_final': resultado[2],
                'costo': resultado[3],
                'fecha': resultado[4]
            })
        return jsonify(data)
    else:
        return jsonify({'message': 'No se encontraron resultados para la fecha actual'}), 404


if __name__ == '__main__':
    app.run(port='5002')
