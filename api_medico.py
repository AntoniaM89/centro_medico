from flask import Flask, jsonify, request
import mysql.connector 

app = Flask(__name__)

db = mysql.connector.connect(
    host="localhost",     
    user="root",   
    password="SofiA.8989!.", 
    database="controlmedico"   
)
cursor = db.cursor()

@app.route('/control_medico', methods=['POST'])
def create_item():
    data = request.get_json()
    correo = data.get('correo')
    contrasena = data.get('contrasena')
    nombre= data.get('nombre')
    apellido= data.get('apellido')
    rut= data.get('rut')    
    cursor.execute("INSERT INTO control_medico ( correo ,contrasena ,nombre ,apellido,rut ) VALUES (%s, %s,%s, %s,%s)", (correo ,contrasena ,nombre ,apellido,rut ))
    db.commit()
    
    return jsonify({'message': 'Elemento creado'})

@app.route('/control_medico', methods=['GET'])
def get_items():
    cursor.execute("SELECT * FROM control_medico")
    control_medico = cursor.fetchall()
    medico_list = []
    for item in control_medico:
        item_dict = {
            'rut': item[0],
            'nombre': item[1],
            'contrsena': item[2],
            'apellido': item[3],
            'correo' : item[4]
            }
        medico_list.append(item_dict)
    return jsonify(medico_list)

@app.route('/control_medico/<int:medico_rut>', methods=['DELETE'])
def delete_item(medico_rut):
    cursor.execute("DELETE FROM control_medico WHERE id = %s", (medico_rut,))
    db.commit()
    return jsonify({'message': 'Elemento eliminado'})


if __name__ == '__main__':
    app.run(port=5000)