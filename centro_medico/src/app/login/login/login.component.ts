import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  correo= '';
  contrasena = '';

  constructor(private http: HttpClient) {}

  login() {
      const body = { correo: this.correo, contrasena: this.contrasena };
    
      this.http.post('http://127.0.0.1:5001/login', body).subscribe(
        (response: any) => {
          console.log(response);
          console.log("ta bien");
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  
}
