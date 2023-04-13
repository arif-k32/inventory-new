import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';


@NgModule({
  declarations: [PagenotfoundComponent],
  imports: [CommonModule, RouterModule, PageNotFoundRoutingModule],
})
export class PageNotFoundModule {}