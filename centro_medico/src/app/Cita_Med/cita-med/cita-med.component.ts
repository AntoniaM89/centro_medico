import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServicioService } from 'src/app/servicios/servicio.service';
@Component({
  selector: 'app-cita-med',
  templateUrl: './cita-med.component.html',
  styleUrls: ['./cita-med.component.css']
})
export class CitaMedComponent {
  rut_usuario: string | null = null;
  correo!: string | null;
  correo2!: string | null;
  hora: any;
  constructor(private http: HttpClient, private servicio: ServicioService) {}
  ngOnInit() {
    this.consulta();
    this.correo2 = this.servicio.getCorreo();
    this.correo = this.servicio.getCorreo();
    this.obtener_rut();
    console.log("rut:", this.rut_usuario);
    console.log("correo:", this.correo);
    const Form1 = document.getElementById("Form1") as HTMLElement;
    const Form2 = document.getElementById("Form2") as HTMLElement;
    const Form3 = document.getElementById("Form3") as HTMLElement;

    const Next1 = document.getElementById("Next1") as HTMLButtonElement;
    const Next2 = document.getElementById("Next2") as HTMLButtonElement;
    const Back1 = document.getElementById("Back1") as HTMLButtonElement;
    const Back2 = document.getElementById("Back2") as HTMLButtonElement;
    Form1.style.display = "block"; 
    Form2.style.display = "none";
    Form3.style.display = "none";
    Next1.addEventListener('click', () => {
      Form1.style.display = "none";
      Form2.style.display = "block";
      Form3.style.display= "none";
    });

    Next2.addEventListener('click', () => {
      Form2.style.display = "none";
      Form3.style.display = "block";
    });

    Back1.addEventListener('click', () => {
      Form2.style.display = "none";
      Form1.style.display = "block";
    });

    Back2.addEventListener('click', () => {
      Form3.style.display = "none";
      Form2.style.display = "block";
    });
    
  }
  
  consulta(){
    this.http.get('http://127.0.0.1:5003/consulta')
    .subscribe(
    (response: any) => {
      this.hora = response;
      console.log("Respuesta del servidor:", response);
      console.log("Calendario actual:", this.hora);
    },
    (error: any) => {
      console.error("Error en la solicitud:", error);
    }
  );
  }
  
  async obtener_rut() {
    try {
      const response: any = await this.http.get('http://127.0.0.1:5003/rut/' + this.correo)
      .toPromise();
      if (response && response.rut) {
        this.rut_usuario = response.rut;
        console.log("Respuesta del servidor:", response.rut_usuario);
        console.log("rut:", this.rut_usuario);
      } else {
        console.error("Respuesta del servidor no contiene el campo 'rut'.");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud HTTP:", error);
    }
  }

  agendar(rut_medico:string){
    const body = {
      rut_cliente:this.rut_usuario,
      rut_medico: rut_medico
    }
    console.log(body)
    this.http.post('http://127.0.0.1:5003/actualizar_hora', body).subscribe(
      (response: any) => {
        console.log(response);
        console.log("se guardó correctamente");
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}

