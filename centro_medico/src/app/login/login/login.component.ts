import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Importa Router correctamente

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  correo= '';
  contrasena = '';
  
  constructor(private http: HttpClient, private route: Router) { 
  }

  login() {
    const body = { correo: this.correo, contrasena: this.contrasena };

    this.http.post('http://127.0.0.1:5001/login', body).subscribe(
      (response: any) => {
        if (response.userExists) {
          localStorage.setItem('correo', this.correo);
            if (this.correo.includes('@galenos.com')) {
              console.log(response);
              console.log('Login exitoso');
              this.route.navigate(['/Secretario']);
              localStorage.setItem('correo', this.correo);
              console.log(this.correo);
            }
            else if (this.correo.includes('@galenosMED.com')) {
              console.log(response);
              console.log('Login exitoso');
              this.route.navigate(['/Medico']);
              localStorage.setItem('correo', this.correo);
              console.log(this.correo);
            }
            else{
              this.route.navigate(['/inicio']);
              localStorage.setItem('correo', this.correo);
              console.log(this.correo);
            }
        } else {
          console.log('usuario no existe');
        }
      (error: any) => {
        console.error(error);
      }
  });
    }
}