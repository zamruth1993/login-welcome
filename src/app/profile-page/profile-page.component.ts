import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUploadServiceService } from '../services/login-upload-service.service';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  file!: File; // file variable
  //slimOptions declaration
  slimOptions = {
    ratio: '1:1',
    download: false,
    upload: false,
    initialImage: '',
    service: this.slimService.bind(this),
    didInit: this.slimInit.bind(this)
  };
  // to store the response from upload-test api
  uploadApiResponse: any;
  // variables to pass the file input, authToken and isLoading
  imagetopass: any;
  authToken: any;
  isLoading: boolean = false;
  isDisabled:boolean = true;  //to enable or disable save button
  maximumFileSize: string = ''; // to show error incase of filesize greater than 2mb
  uploadedDone: string = ''; // to show the suucess case if file is uploaded

  constructor(private loginUpload: LoginUploadServiceService, private router: Router) { }
  
  ngOnInit(): void {
    // to susbcribe the value from the emitted observable from login-upload-service.ts
    this.loginUpload.authToken.subscribe((res: any) => {
      // if value is present then loading is made false and authToken value is stored which is to be passed while uploading the image.
      //  Else redirected to login page
      if (res) {
        this.isLoading = false;
        this.authToken = res;
      } else {
        this.isLoading = true;
        this.router.navigateByUrl('')
      }
    })
  }


  // called when slim has initialized
  slimInit(data: any, slim: any) {
    // slim instance reference
    // console.log(slim);
    // current slim data object and slim reference
    // console.log(data);
    // this.imagetopass = data;
  };

  // called when upload button is pressed or automatically if push is enabled
  slimService(formdata: any, progress: any, success: any, failure: any, slim: any) {
    // form data to post to server
    // set serviceFormat to "file" to receive an array of files
    // console.log(formdata);
    // call these methods to handle upload state
    // console.log(progress, success, failure);
    // reference to Slim instance
    // console.log(slim);
  };

  /* method is called when user is uploading the image
    fileSizeCheck is done for 2Mb
  */
  uploadFile(event: any) {
    this.isLoading = true;
    this.isDisabled = false;
    let fileSizeCheck = 2 * 1024 * 1024;
    let file = event.target.files[0];
    this.imagetopass = file;
    if (event.target.files && event.target.files[0]) {
      // if file size is greater than 2Mb then error is shown and Save button is disabled
       if (file.size > fileSizeCheck) {
        this.maximumFileSize  = "Maximum file size: 2MB";
        this.uploadedDone = '';
        this.isLoading = false;
        this.isDisabled = true;
      } else {
        // else if file size is less than or equals 2mb then error is hidden and bsave button is enabled
        this.maximumFileSize = '';
        this.isLoading = false;
        this.isDisabled = false;
      }
    }
  }

  /* This function will be called on clicking of save button 
    Where the authtToken and the file is passed to the profileImage() in service file
  */
  saveImage() {
    this.file = this.imagetopass;
    this.loginUpload.profileImage(this.file, this.authToken).subscribe((res) => {
      this.isLoading = true;
      if (res) {
          this.uploadApiResponse = res;
          // if the response is true then suucess message is shown
        if (this.uploadApiResponse.status === true) {
          this.isDisabled = false;
          this.isLoading = false;
          this.uploadedDone = "File is Uploaded Successfully!";
        } else {
          // else suucess message is not shown
          this.slimOptions.initialImage = "";
          this.uploadedDone = '';
        }
      }
    })
  }
}
