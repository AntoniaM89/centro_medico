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
  rut = "";
  hora_inicio = '';
  hora_final = '';
  rut_cliente = null;
  calendario: any;
  anio: number;
  mes: number;
  dia: number | null = null;
  mostrar_formulario: Boolean = false;
  medicos: any[] = [];
  cod_esp = 0;

  constructor(private http: HttpClient, private servicio: ServicioService) {
    this.dia = 0;
    const fechaActual = new Date();
    this.anio = fechaActual.getFullYear();
    this.mes = fechaActual.getMonth() + 1;
  }

  ngOnInit(): void {
    const fechaActual = new Date();
    this.anio = fechaActual.getFullYear();
    this.mes = fechaActual.getMonth() + 1;
    this.obtenerCalendario();
    
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
  abrirFormulario(dia:number) {
      this.dia = dia;
      console.log(dia);
      this.mostrar_formulario = true;
  }
  crear_hora(){
    console.log(this.anio)
    if (this.dia) {
      const body = {
        rut_medico: this.rut,
        hora_inicio: this.hora_inicio,
        hora_final: this.hora_final,
        rut_cliente: null,
        dia: this.dia,
        mes: this.mes,
        anno: this.anio,
        cod_especialidad: this.cod_esp
      }
    this.http.post('http://127.0.0.1:5002/guardar_hora', body).subscribe(
      (response: any) => {
        console.log(response);
        this.mostrar_formulario = false;

      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  
}

buscarMedicos() {
  this.medicos = [];
  
  if (this.rut) {
    const url = `http://127.0.0.1:5002/obtener_rut?rut=${this.rut}`;
    console.log(this.rut)

    this.http.get<any[]>(url).subscribe(
      (data) => {
        if (data.length > 0) {
          this.medicos = data;
          this.cod_esp = data[0]['me.id_esp'];
          console.log(this.cod_esp)
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
}

