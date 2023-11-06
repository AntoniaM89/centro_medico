import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { InicioComponent } from './inicio/inicio/inicio.component';
import { SingUpComponent } from './sing_up/sing-up/sing-up.component';
import { InformesComponent } from './informes/informes/informes.component';
import { CitaMedComponent } from './Cita_Med/cita-med/cita-med.component';
import { GenCalComponent } from './gen-cal/gen-cal.component';
import { GenConsComponent } from './gen-cons/gen-cons.component';

@NgModule({
  imports: [RouterModule.forRoot([{ path: 'inicio', component: InicioComponent },
                                  {path:'',component: LoginComponent},
                                  {path:'singup',component: SingUpComponent},
                                  {path:'informe', component: InformesComponent},
                                  {path:'cita',component: CitaMedComponent},
                                  {path:'gen_cita',component: CitaMedComponent},
                                  {path:'gen_calendario',component: GenCalComponent},
                                  {path:'gen_consulta',component: GenConsComponent},])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
