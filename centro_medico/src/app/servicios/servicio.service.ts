import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private apiUrl = 'http://0.0.0.0:5001';
  constructor( private http: HttpClient) { }
  login(correo: string, contrasena: string) {
    const credentials = { correo, contrasena };
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}
