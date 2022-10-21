import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { LoginUploadServiceService } from '../services/login-upload-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoading: boolean = false;
  headerSusc: Subject<any> | undefined;

  constructor(private loginUpload: LoginUploadServiceService,private router: Router) { }

  ngOnInit(): void {
   this.loginUpload.authToken.subscribe((res: any) => {
      if (res) {
        this.isLoading = false;
      } else {
        this.isLoading = true;
      }
    })
  }

  logout() {
    this.loginUpload.setAuthToken(null)
  }

}
