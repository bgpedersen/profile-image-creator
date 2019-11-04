import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LandingComponent, LoginComponent],
  imports: [CommonModule, LandingRoutingModule],
  exports: [LandingComponent, LoginComponent]
})
export class LandingModule {}
