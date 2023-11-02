from flask import Flask, render_template
import calendar

app = Flask(__name__)

@app.route('/calendario/<int:anio>/<int:mes>')
def generar_calendario(anio, mes):
    # Generar un calendario para el año y mes especificados
        cal = calendar.Calendar()
        days = list(cal.itermonthdays(anio, mes))

    # Organizar los días en una matriz para representar el calendario
        calendario = [days[i:i+7] for i in range(0, len(days), 7)]
    # Renderizar el calendario en una plantilla HTML
        return render_template('centro_medico/src/app/informes/informes/informes.component.html', ano=anio, mes=mes, calendario=calendario)

if __name__ == '__main__':
    app.run()
    
     