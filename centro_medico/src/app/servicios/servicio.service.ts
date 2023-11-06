import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  getCorreo(): string | null {
    return localStorage.getItem('correo');
  }
}


