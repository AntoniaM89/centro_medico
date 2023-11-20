import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modificar-agenda',
  templateUrl: './modificar-agenda.component.html',
  styleUrls: ['./modificar-agenda.component.css']
})
export class ModificarAgendaComponent {
  rut = '';
  medicos: any[] = [];
  consultas: any[] = [];

  constructor(private http: HttpClient) {}

  buscarMedicos() {
    this.medicos = [];
    this.consultas = [];

    if (this.rut) {
      const urlMedicos = `http://127.0.0.1:5002/obtener_rut?rut=${this.rut}`;

      this.http.get<any[]>(urlMedicos).subscribe(
        (data) => {
          if (data.length > 0) {
            this.medicos = data;
            
            
          } else {
            console.log('No se encontraron médicos con el RUT proporcionado.');
          }
        },
        (error) => {
          console.error('Error al obtener médicos', error);
          console.log('Error al obtener médicos. Por favor, inténtelo de nuevo.');
        }
      );
    } else {
      console.log('Ingrese un RUT válido.');
    }
  }
  obtenerConsultas() {
      const urlConsultas = `http://127.0.0.1:5003/consulta?rut=${this.rut}`;
  
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
  
}
