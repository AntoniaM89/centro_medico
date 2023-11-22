import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { InicioComponent } from './inicio/inicio/inicio.component';
import { SingUpComponent } from './sing_up/sing-up/sing-up.component';
import { InformesComponent } from './informes/informes/informes.component';
import { CitaMedComponent } from './Cita_Med/cita-med/cita-med.component';
import { GenCalComponent } from './gen-cal/gen-cal.component';
import { HomeEmpComponent } from './View_empleado/Home_emp/home-emp/home-emp.component';
import { HomeMedComponent } from './View_medico/Home_med/home-med/home-med.component';
import { CrearEspecialidadComponent } from './View_empleado/crear_Especialidad/crear-especialidad/crear-especialidad.component';
import { CrearMedicoComponent } from './View_empleado/Crear_Medico/crear-medico/crear-medico.component';
import { ModificarAgendaComponent } from './View_empleado/modificar-agenda/modificar-agenda.component';
import { VerHorasComponent } from './View_medico/Ver_horas/ver-horas/ver-horas.component';
import { VerHoraComponent } from './View_empleado/ver-hora/ver-hora.component';
@NgModule({
  imports: [RouterModule.forRoot([ /*General */
                                  {path:'',component: LoginComponent},
                                  {path:'singup',component: SingUpComponent},
                                  /*Secretario*/ 
                                  {path:'informe', component: InformesComponent},
                                  {path:'gen_calendario',component: GenCalComponent},
                                  {path:'Secretario',component: HomeEmpComponent},
                                  {path:'horas_medico', component: VerHoraComponent},
                                  {path: 'crear_medico',component: CrearMedicoComponent},
                                  {path:'crear_especialidad',component: CrearEspecialidadComponent},
                                  {path:'modificar_horas', component: ModificarAgendaComponent},
                                  /*Medico */
                                  {path:'Medico',component: HomeMedComponent},
                                  {path:'Ver_horario',component: VerHorasComponent},
                                  /*Cliente */
                                  { path: 'inicio', component: InicioComponent },
                                  {path:'cita',component: CitaMedComponent},
                                  {path:'gen_cita',component: CitaMedComponent},
                                ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
