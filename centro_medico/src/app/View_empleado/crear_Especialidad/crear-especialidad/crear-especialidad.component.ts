import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-crear-especialidad',
  templateUrl: './crear-especialidad.component.html',
  styleUrls: ['./crear-especialidad.component.css']
})
export class CrearEspecialidadComponent{
  nombre = "";
  precio = 0 ;
  
  constructor (private http: HttpClient){}

  
  registrar(){
    const body = {nombre: this.nombre, precio: this.precio}
    this.http.post('http://127.0.0.1:5001/registrar_especialidad', body).subscribe(
      (response : any) => {
        console.log(response);
        console.log("registro exitoso de especialidad");
      },
      (error: any) => {
        console.error(error);
      });
    
  }

}
