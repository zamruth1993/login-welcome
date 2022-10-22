import { Component, OnInit } from '@angular/core';
import { LoginUploadServiceService } from './services/login-upload-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'welcome-profile';
  isLoading: boolean = false;

constructor(private loginUpload: LoginUploadServiceService) {}


ngOnInit(): void {
  
  this.loginUpload.authToken.subscribe((res: string) => {
    if (res === null || res === '' || res === "") {
      this.isLoading = true;
    } else {
      this.isLoading = false;
    }
  })
}

}
