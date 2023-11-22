import { Component } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
@Component({
  selector: 'app-ver-hora',
  templateUrl: './ver-hora.component.html',
  styleUrls: ['./ver-hora.component.css']
})
export class VerHoraComponent {
  rut_medico = "";

  id_t=0;
  fechaActual!: string;  
  consultas: any[] = [];
  dia!: string;
  mes!: string;
  anno!: string;

  constructor(private http: HttpClient) 
  { this.obtenerFechaActual();}  

  obtenerFechaActual() {
    const today = new Date();
    const dia = today.getDate();
    const mes = today.getMonth() + 1; // ¡Atención! Los meses en JavaScript son 0-indexados
    const anno = today.getFullYear();

    this.dia = dia < 10 ? '0' + dia : dia.toString();
    this.mes = mes < 10 ? '0' + mes : mes.toString();
    this.anno = anno.toString();
  }
  obtenerConsultas() {    
    const body ={
      rut_medico : this.rut_medico,
      dia : 20,
      mes : this.mes,
      anno: this.anno,
    };

    this.http.post<any[]>('http://127.0.0.1:5002/fecha_actual', body)
      .subscribe(
        (data) => {
          if (data.length > 0) {
            console.log(data);
            this.consultas = data;
            console.log(this.consultas)
          } else {
            console.log('No se encontraron consultas para el médico con el RUT proporcionado.');
          }
        },
        (error) => {
          console.error(error);

        }
      );
  }
  id_T = 0;
  cambiar_estado(consulta: any) {
    this.id_T = consulta.id_T
    const urlCambiarEstado = `http://127.0.0.1:5000/cambiar_estado?id_t=${this.id_T}`;
    this.http.get<any[]>(urlCambiarEstado, {}).subscribe(
      (data) => {
        console.log(data);
        console.log('Estado cambiado con éxito');
      },
      (error) => {
        console.error('Error al cambiar el estado', error);
      }
    );
  }
}