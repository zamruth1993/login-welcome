import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUploadServiceService } from '../services/login-upload-service.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  isLoading: boolean = true;
  constructor(private loginUpload: LoginUploadServiceService, private router:Router) { }

  ngOnInit(): void {
    // to susbcribe the value from the emitted observable from login-upload-service.ts
    this.loginUpload.authToken.subscribe((res: any) => {
      // if value is present then loading is made false . Else redirected to login page
      if (res) {
        this.isLoading = false;
      } else {
        this.isLoading = true;
        this.router.navigateByUrl('')
      }
    })
  }
}
