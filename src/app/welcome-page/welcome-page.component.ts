import { Component, OnInit } from '@angular/core';
import { LoginUploadServiceService } from '../services/login-upload-service.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  showWelcome: boolean = false;
  isLoading: boolean = true;
  loginResponse: any;
  authToken: any;
  constructor(private loginUpload:LoginUploadServiceService) { }

  ngOnInit(): void {
    this.loginUpload.loginTest().subscribe(res =>{
      if(res) {
        this.showWelcomePage();
        this.loginResponse  = res;
        this.isLoading = false;
        this.authToken = this.loginResponse.auth_token;
      }
     })
  }

  showWelcomePage() {
    this.showWelcome = true;
  }
}
