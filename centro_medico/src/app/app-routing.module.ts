import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { InicioComponent } from './inicio/inicio/inicio.component';
import { SingUpComponent } from './sing_up/sing-up/sing-up.component';
import { InformesComponent } from './informes/informes/informes.component';
import { CitaMedComponent } from './Cita_Med/cita-med/cita-med.component';

@NgModule({
  imports: [RouterModule.forRoot([{ path: '', component: InicioComponent },
                                  {path:'login',component: LoginComponent},
                                  {path:'singup',component: SingUpComponent},
                                  {path:'informe', component: InformesComponent},
                                  {path:'cita',component: CitaMedComponent},])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
