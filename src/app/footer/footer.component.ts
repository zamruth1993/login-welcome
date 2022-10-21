import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private loginUpload: LoginUploadServiceService) { }

  ngOnInit(): void {
    this.subscription = this.loginUpload.authToken.subscribe((res: any) => {
      if (res === null || res === '' || res === "") {
        this.isLoading = true;
      } else {
        this.isLoading = false;
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
