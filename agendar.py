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
    password="SofiA.8989!.",
    database="controlmedico"
)
db2 = mysql.connector.connect(
    host="localhost",
    user="root",
    password="SofiA.8989!.",
    database="controlusuario"
)
cursor=db.cursor()
cursor2 = db2.cursor()
@app.route('/actualizar_hora', methods=['POST'])
def actualizar_hora():
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
    consulta_sql = "SELECT con.nombre, con.rut , gen.hora_final ,gen.hora_inicio FROM controlmedico.gen_calendario gen join controlmedico.control_medico con on gen.rut_medico = con.rut;"
    print("Consulta SQL:", consulta_sql)
    cursor2.execute(consulta_sql)
    resultados = cursor2.fetchall()
    data = [{'nombre': nombre, 'rut': rut, 'hora_inicio': hora_inicio, 'hora_final': hora_final} for nombre, rut, hora_final, hora_inicio,  in resultados]
    return jsonify(data)

@app.route('/rut/<correo>', methods=['GET'])
def rut(correo):
    cursor2.execute("SELECT rut FROM controlusuario.control_usuario WHERE correo = %s;", (correo,))
    resultado = cursor2.fetchone()
    if resultado:
        rut_usuario = resultado[0]
        return jsonify({"rut": rut_usuario})
    else:
        return jsonify({"error": "usuario no encontrado"})

if __name__ == '__main__':
    app.run(port=5003)