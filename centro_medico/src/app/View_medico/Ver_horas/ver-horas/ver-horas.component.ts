import { HttpClient,  } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ver-horas',
  templateUrl: './ver-horas.component.html',
  styleUrls: ['./ver-horas.component.css']
})
export class VerHorasComponent {
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
    
    const urlConsultas = `http://127.0.0.1:5002/fecha_actual?dia=${this.dia}&mes=${this.mes}&anno=${this.anno}&rut_medico=${this.rut_medico}`;
    this.http.get<any[]>(urlConsultas).subscribe(
      (data) => {
        if (data.length > 0) {
          this.consultas = data;
        } else {
          console.log('No se encontraron consultas para el médico con el RUT proporcionado.');
        }
      },
      (error) => {
        console.error('Error al obtener consultas', error);
        console.log('Error status:', error.status);
        console.log('Error message:', error.message);
      }
    );
  }
  cambiar_estado(consulta: any) {
    const urlCambiarEstado = `http://127.0.0.1:5000/cambiar_estado?id_t=${consulta.id_T}`;
    this.http.post<any[]>(urlCambiarEstado, {}).subscribe(
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
