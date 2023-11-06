import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServicioService } from '../servicios/servicio.service';

@Component({
  selector: 'app-gen-cal',
  templateUrl: './gen-cal.component.html',
  styleUrls: ['./gen-cal.component.css']
})
export class GenCalComponent implements OnInit {
  dia_seleccionado: number | null = null;
  correo!: string | null;
  hora_inicio = '';
  hora_final = '';
  rut_cliente = null;
  calendario: any;
  rut_medico: string | null = null;
  anio: number;
  mes: number;
  dia: number | null = null;
  mostrar_formulario: Boolean = false;

  constructor(private http: HttpClient, private servicio: ServicioService) {
    this.dia = 0;
    const fechaActual = new Date();
    this.anio = fechaActual.getFullYear();
    this.mes = fechaActual.getMonth() + 1;
  }

  ngOnInit(): void {
    this.correo = this.servicio.getCorreo();
    console.log("correo:", this.correo);
    const fechaActual = new Date();
    this.anio = fechaActual.getFullYear();
    this.mes = fechaActual.getMonth() + 1;
    this.obtenerCalendario();
    this.obtenerRut();
  }
  
  obtenerCalendario() {
    this.http.get(`http://127.0.0.1:5002/generar_calendario/${this.anio}/${this.mes}`)
    .subscribe(
      (calendarData: any) => {
        this.calendario = calendarData;
        console.log("Respuesta del servidor:", calendarData);
        console.log("Calendario actual:", this.calendario);
      },
      (error: any) => {
        console.error("Error en la solicitud:", error);
      }
    );
  }
  obtenerRut(){
    this.http.get('http://127.0.0.1:5002/obtener_rut?correo=' + this.correo).subscribe(
      (response: any) => {
        if (response.rut) {
          this.rut_medico = response.rut; 
        }
      },
      (error: any) => {
        console.error(error);
    })
  }
  abrirFormulario(dia:number) {
      this.dia = dia;
      console.log(dia);
      this.mostrar_formulario = true;
  }
  crear_hora(){
    console.log(this.anio)
    if (this.dia) {
      const body = {
        rut_medico: this.rut_medico,
        hora_inicio: this.hora_inicio,
        hora_final: this.hora_final,
        rut_cliente: null,
        dia: this.dia,
        mes: this.mes,
        anio: this.anio}
    this.http.post('http://127.0.0.1:5002/guardar_hora', body).subscribe(
      (response: any) => {
        console.log(response);
        console.log("se guardo de pana");
        this.mostrar_formulario = false;

      },
      (error: any) => {
        console.error(error);
      }
    );
    
  }
}
}

