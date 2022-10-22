import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginUploadServiceService } from '../services/login-upload-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  subscription!: Subscription;
  constructor(private loginUpload: LoginUploadServiceService,private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.loginUpload.authToken.subscribe((res: string) => {
      if (res) {
        this.isLoading = false;
      } else {
        this.isLoading = true;
      }
    })
  }

  logout() {
    this.loginUpload.setAuthToken('')
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
