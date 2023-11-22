import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent {
  correo= '';
  nombre= '';
  rut= '';
  apellido= '';
  contrasena= '';
  constructor (private http: HttpClient,private route: Router){}
  registrar() {
    const body = { correo: this.correo, contrasena: this.contrasena , nombre: this.nombre, apellido:this.apellido,rut:this.rut};
  
    this.http.post('http://127.0.0.1:5001/registrar', body).subscribe(
      (response: any) => {
        console.log(response);
        console.log("registro exitoso");
        this.route.navigate(['']);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
