import { Component } from '@angular/core';

@Component({
  selector: 'app-cita-med',
  templateUrl: './cita-med.component.html',
  styleUrls: ['./cita-med.component.css']
})
export class CitaMedComponent {

  ngOnInit() {
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
}

