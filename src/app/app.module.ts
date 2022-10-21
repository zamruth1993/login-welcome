import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { SlimModule } from '../app/shared/slim/slim.angular.module';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    ProfilePageComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SlimModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule       
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
