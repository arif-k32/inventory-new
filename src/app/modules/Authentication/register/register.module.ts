import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { RegisterRoutingModule } from './register-routing.module';




@NgModule({
  declarations: [
                  RegisterComponent
                ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterRoutingModule    
  ],
})
export class RegisterModule { }
