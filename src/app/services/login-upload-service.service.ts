import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginUploadServiceService {

  constructor(private http: HttpClient) { }
  
  loginTest() {
    let bodyData = {
      "email": "sample-user@test.com",
      "password": "sample-password"
    }
    const url = 'https://api.occamlab.com.sg/demo-occamlab/login-test';
  return this.http.post(url,bodyData)
  }

  profileImage(blob_auth_response:any) {
  
    const url = 'https://api.occamlab.com.sg/demo-occamlab/upload-test';
    // let bodyData = {
    //    'imageBlob' : imageUrl.changingThisBreaksApplicationSecurity,
    //    'authToken' : token
    // }
    const header = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':  'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'false',
      'WWW-Authenticate': 'Basic realm="Access to the staging site"'
    }
    return this.http.post(url,{blob_auth_response}, {headers:header})
    // return this.http.post(url,imageBlob, {headers:header})
  }

 // Returns an observable
 upload(file:any):Observable<any> {
   // API url
   let baseApiUrl = "https://file.io"
  const url = 'https://api.occamlab.com.sg/demo-occamlab/upload-test';
  // Create form data
  const formData = new FormData(); 
    
  // Store form name as "file" with file data
  formData.append("file", file, file.name);
  // Make http post request over api
  // with formData as req
  return this.http.post(baseApiUrl,formData)
}

// Returns an observable
uploadProfilePic(file:any,authentication:any):Observable<any> {
  // API url
 const url = 'https://api.occamlab.com.sg/demo-occamlab/upload-test';
 // Create form data
 const formData = new FormData(); 
   
 // Store form name as "file" with file data
 formData.append("file", file, file.name);
 formData.append("authUrl", authentication)
 // Make http post request over api
 // with formData as req
 return this.http.post(url,formData)
}
  }

