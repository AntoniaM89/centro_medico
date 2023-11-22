import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-crear-medico',
  templateUrl: './crear-medico.component.html',
  styleUrls: ['./crear-medico.component.css']
})
export class CrearMedicoComponent implements OnInit {
  nombre = "";
  rut = '';
  correo = '';
  apellido = '';
  contrasena = '';
  especialidades: any[] = [];
  id = 0;
  especialidadControl = new FormControl();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://127.0.0.1:5001/consulta_especialidad').subscribe(
    (data) => {
      this.especialidades = data;
      console.log(this.especialidades);
    });

    this.especialidadControl.valueChanges.subscribe((value) => {
      this.id = value;
    });
  }
  ver(){
      console.log(this.id);
  }
  registrar() {
    const body = {
      correo: this.correo,
      contrasena: this.contrasena,
      nombre: this.nombre,
      apellido: this.apellido,
      rut: this.rut,
      id_esp: this.id
    };

    this.http.post('http://127.0.0.1:5001/registrar_medico', body).subscribe(
      (response: any) => {
        console.log(response);
        console.log("Te uniste de pana");
      },
      (error: any) => {
        console.error(error);
        console.log(body);
      });
  }
}