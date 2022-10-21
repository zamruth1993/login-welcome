import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoginUploadServiceService } from '../services/login-upload-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginResponse: any;
  isLoading: boolean = false;

  constructor(private loginUpload: LoginUploadServiceService, private router: Router) { }

  login() {
    this.isLoading = true;
    this.loginUpload.loginTest().subscribe(res => {
      if (res) {
        this.isLoading = false;
        this.loginResponse = res;
        this.loginUpload.setAuthToken(this.loginResponse.auth_token); // to set the authToken value in the service file 
        this.router.navigateByUrl('/welcome')
      } else {
        this.isLoading = false;
        this.loginUpload.setAuthToken(null);
      }
    })
  }
}
