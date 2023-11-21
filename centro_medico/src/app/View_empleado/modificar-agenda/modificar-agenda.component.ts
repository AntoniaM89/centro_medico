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
  id_t = 0;
  selectedConsulta: any;
  horainicio!: string;
  horafinal!: string;
  costo!: number;
  descuento!: number;
  constructor(private http: HttpClient) {}
  seleccionarConsulta(consulta: any) {
    this.selectedConsulta = consulta;
    this.horainicio = consulta.hora_inicio;
    this.horafinal = consulta.hora_final;
    this.costo = consulta.costo;
    this.descuento = consulta.descuento;
    console.log(this.selectedConsulta);
  }
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
          console.error( error);
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
    modificarConsulta() {
      const body = {
          hora_inicio: this.horainicio,
          hora_final: this.horafinal,
          costo: this.costo,
          id_T: this.selectedConsulta.id_T
      };
      this.http.post('http://127.0.0.1:5002/modificar_consulta', body).subscribe(
          (response) => {
              console.log(response);
          },
          (error) => {
              console.error( error);
          }
      );
  }
  
}
