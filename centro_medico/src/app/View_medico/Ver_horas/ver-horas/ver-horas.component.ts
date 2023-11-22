import { HttpClient,  } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
@Component({
  selector: 'app-ver-horas',
  templateUrl: './ver-horas.component.html',
  styleUrls: ['./ver-horas.component.css']
})
export class VerHorasComponent implements OnInit {
  
  correo!: string|null;
  id_t=0;
  fechaActual!: string;  
  consultas: any[] = [];
  dia!: string;
  mes!: string;
  anno!: string;
  rut_medico: string | null = null;
  constructor(private http: HttpClient, private servicio : ServicioService) 
  { this.obtenerFechaActual();}  
  ngOnInit(): void {
      this.correo = this.servicio.getCorreo();
      this.obtener_rut(); 

  }
  async obtener_rut() {
    try {
      const response: any = await this.http.get('http://127.0.0.1:5000/rut_medico/' + this.correo)
        .toPromise();
      if (response && response.rut) {
        this.rut_medico = response.rut;
        console.log("Respuesta del servidor:", response.rut);
        console.log("rut:", this.rut_medico);
        this.obtenerConsultas(); 
      } else {
        console.error("Respuesta del servidor no contiene el campo 'rut'.");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud HTTP:", error);
    }
  }
  obtenerFechaActual() {
    const today = new Date();
    const dia = today.getDate();
    const mes = today.getMonth() + 1; 
    const anno = today.getFullYear();

    this.dia = dia < 10 ? '0' + dia : dia.toString();
    this.mes = mes < 10 ? '0' + mes : mes.toString();
    this.anno = anno.toString();
  }
  obtenerConsultas() {    
    console.log(this.rut_medico)
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
