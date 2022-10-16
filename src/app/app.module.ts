import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SlimModule } from '../app/shared/slim/slim.angular.module';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    ProfilePageComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    FileUploadComponent
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
