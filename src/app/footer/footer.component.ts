import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginUploadServiceService } from '../services/login-upload-service.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
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
    this.loginUpload.setAuthToken('');
    this.router.navigateByUrl('')
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
