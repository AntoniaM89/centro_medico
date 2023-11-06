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
          console.log(response);
          console.log('Login successful');
          this.route.navigate(['/inicio']);
        } else {
          console.log('User does not exist');
        }
      (error: any) => {
        console.error(error);
      }
  });
    }
}