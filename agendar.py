import smtplib
from flask import Flask, jsonify, request
import mysql.connector
from email.message import EmailMessage
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="empleado"
)
db2 = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="agenda"
)
cursor=db.cursor()
cursor2 = db2.cursor()
@app.route('/enviar_correo', methods=['POST'])
def enviar_correo():
    data = request.get_json()
    rut_cliente = data.get('rut_cliente')
    rut_medico = data.get('rut_medico')
    cursor.execute("UPDATE gen_calendario SET rut_cliente = %s WHERE rut_medico = %s", (rut_cliente, rut_medico))
    db.commit()
    cursor2.execute("SELECT correo FROM controlusuario.control_usuario WHERE rut = %s;", (rut_cliente,))
    result = cursor2.fetchone()
    if result:
        destinatario = result[0]
        remitente = "verseniared@gmail.com"
        email = EmailMessage()
        email["From"] = remitente
        email["To"] = destinatario
        email["Subject"] = "Cita Agregada"
        email.set_content(f"¡Su cita ha sido agregada con éxito!")
        smtp = smtplib.SMTP_SSL("smtp.gmail.com")
        smtp.login(remitente, "kgqy oiqx krae uthc")
        smtp.sendmail(remitente, destinatario, email.as_string())
        smtp.quit()
        return jsonify({'message': 'Hora actualizada'})

@app.route('/consulta', methods=['GET'])
def consulta():
    rut = request.args.get('rut') 
    cursor2.execute("SELECT id_T, hora_inicio, hora_final, costo, descuento, CONCAT(dia,'/',mes,'/',anno) as fecha FROM hora_t where rut_medico = %s", (rut,))
    resultados = cursor2.fetchall()
    if resultados:
        data = []
        for resultado in resultados:
            data.append({
                'id_T': resultado[0],
                'hora_inicio': resultado[1],
                'hora_final': resultado[2],
                'costo': resultado[3],
                'descuento': resultado[4],
                'fecha': resultado[5]
            })
        return jsonify(data)
    else:
        return jsonify({'error': 'No se encontró ninguna consulta para el médico con el RUT proporcionado'}), 404

@app.route('/actualizar_hora', methods=['PUT'])
def actualizar_hora():
    data = request.get_json()
    id_t = data.get('id_T')
    hora_inicio = data.get('hora_inicio')
    hora_final = data.get('hora_final')
    costo = data.get('costo')
    cursor2.execute("UPDATE hora_t SET hora_inicio = %s, hora_final = %s, costo = %s WHERE id_T = %s", (hora_inicio, hora_final, costo, id_t))
    db2.commit()
    return jsonify({'message': 'Hora actualizada correctamente'})


if __name__ == '__main__':
    app.run(port=5003)