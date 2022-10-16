import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginUploadServiceService } from '../services/login-upload-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginUpload:LoginUploadServiceService) { }
 
  ngOnInit(): void {
  }

  callApi() {
   this.loginUpload.loginTest().subscribe(res =>{
    console.log('res', res);
    if(res) {
      let showPage = true;
    }
   })
}
}
