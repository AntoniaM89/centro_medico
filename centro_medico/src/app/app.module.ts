import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router'; 
import { InicioComponent } from './inicio/inicio/inicio.component';
import { LoginComponent } from './login/login/login.component';
import { SingUpComponent } from './sing_up/sing-up/sing-up.component';
import { InformesComponent } from './informes/informes/informes.component';
import { CitaMedComponent } from './Cita_Med/cita-med/cita-med.component';

import { GenCalComponent } from './gen-cal/gen-cal.component';

import { HomeEmpComponent } from './View_empleado/Home_emp/home-emp/home-emp.component';
import { CrearMedicoComponent } from './View_empleado/Crear_Medico/crear-medico/crear-medico.component';
import { VerHorasComponent } from './View_medico/Ver_horas/ver-horas/ver-horas.component';
import { HomeMedComponent } from './View_medico/Home_med/home-med/home-med.component';
import { CrearEspecialidadComponent } from './View_empleado/crear_Especialidad/crear-especialidad/crear-especialidad.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModificarAgendaComponent } from './View_empleado/modificar-agenda/modificar-agenda.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    SingUpComponent,
    InformesComponent,
    CitaMedComponent,
    GenCalComponent,
    HomeEmpComponent,
    CrearMedicoComponent,
    VerHorasComponent,
    HomeMedComponent,
    CrearEspecialidadComponent,
    ModificarAgendaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatMenuModule,
    
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
