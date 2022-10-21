import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginUploadServiceService {

  constructor(private http: HttpClient) { }

  /* BehaviourSubject -> to return the current value on subscription
     authSource -> a variable to handle this data stream as an observable that will be used by the components
     setAuthToken -> a function to call the next() function to change the authToken value.
  */
  private authSource = new BehaviorSubject('');
  authToken = this.authSource.asObservable()

  setAuthToken(authToken: any) {
    // if (name !== null || name !== '' || name !== undefined)
      this.authSource.next(authToken);
  }
  // loginTest api to pass the details and get the response
  loginTest() {
    let bodyData = {
      "email": "sample-user@test.com",
      "password": "sample-password"
    }
    const url = 'https://api.occamlab.com.sg/demo-occamlab/login-test';
    return this.http.post(url, bodyData)
  }

  // to upload the image with authToken as the authorization header
  profileImage(urlImage: any, auth: string) {
    const url = 'https://api.occamlab.com.sg/demo-occamlab/upload-test';
    const header = {
      'Content-Type': 'image/jpeg',
      'Authorization': auth
    }
    const formData = new FormData();
    formData.append("file", urlImage, urlImage.name);
    return this.http.post(url, urlImage, { headers: header })
  }
}

