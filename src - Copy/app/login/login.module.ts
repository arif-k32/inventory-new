import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './root/root.component';

const routes:Routes=[
    {
        path:'',
        component:RootComponent,
    }
]


@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginModule { }
