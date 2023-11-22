# app.py

from flask import Flask, jsonify, send_file
from reportlab.pdfgen import canvas
import mysql.connector

app = Flask(__name__)

# Conectar a la base de datos MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",  # Coloca tu contraseña si es necesario
    database="Agenda"
)
cursor = db.cursor()

# Ruta para generar el informe en PDF
@app.route('/generar_informe', methods=['GET'])
def generar_informe():
    contenido = "Este es un informe de prueba."

    cursor.execute("SELECT rut_medico, cod_especialidad, costo, desc FROM hora_t")
    atenciones = cursor.fetchall()

    cursor.execute("SELECT ROUND(SUM(costo * descuento), 2) AS costo_total FROM hora_t")
    costo_total = cursor.fetchone()[0]

    cursor.execute('INSERT INTO informes (servicio, precio, descuento, dia, mes, anno) VALUES (%s, %s, %s, %s, %s, %s)',
                    (atenciones[1], atenciones[2], atenciones[3], '01', '01', '2023'))  # Ajusta la fecha según tus necesidades
    db.commit()

    # Generar el informe en PDF
    pdf_filename = 'informe.pdf'
    generar_pdf(pdf_filename, atenciones, costo_total)

    # Enviar el archivo PDF como respuesta
    return send_file(pdf_filename, as_attachment=True)

def generar_pdf(filename, atenciones, costo_total):
    pdf = canvas.Canvas(filename)
    pdf.drawString(100, 800, "Informe de Atenciones Médicas")

    y_position = 780
    for atencion in atenciones:
        pdf.drawString(100, y_position, f"RUT Médico: {atencion[0]}, Especialidad: {atencion[1]}, Costo: {atencion[2]}, Descuento: {atencion[3]}")
        y_position -= 20

    pdf.drawString(100, y_position, f"Costo Total: {costo_total}")
    pdf.save()

if __name__ == '__main__':
    app.run(port="5005")
