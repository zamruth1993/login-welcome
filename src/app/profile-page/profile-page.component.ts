import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { dataURLToBlob } from 'blob-util';
import { LoginUploadServiceService } from '../services/login-upload-service.service';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  y:any;
  selectedFiles: any;
  previews: string[] = [];
  limitMessage: string = '';
  numberExceeded: boolean = false;
  registrationForm!: FormGroup;
  submitted: boolean = false;
  dropDownText: boolean = true;
  sanitizeUrl: any;
  file!: File;
    slimOptions = {
    ratio: '1:1',
    download: false,
    upload: false,
    initialImage: '',
    service: this.slimService.bind(this),
    didInit: this.slimInit.bind(this)
};
  imagetopass: any;
  authToken: any;
  shortLink: any;
  loading: boolean = false;
  constructor(public sanitizer: DomSanitizer,public fb: FormBuilder,
    private cd: ChangeDetectorRef,private loginUpload:LoginUploadServiceService) { }


  
    /*########################## File Upload ########################*/
    @ViewChild('fileInput') el: ElementRef | undefined;
    imageUrl: any = '';
    editFile: boolean = true;
    removeUpload: boolean = false;
// @Input() authTokenValue: string ='';
  ngOnInit(): void {
    
    /*##################### Registration Form #####################*/
    this.registrationForm = this.fb.group({
      file: [null]
    })  
    this.loginUpload.loginTest().subscribe((res: any) =>{
      if(res) {
        this.authToken = res.auth_token;
      }
    })    
  }

  checkForImage() {
    if(this.slimOptions.initialImage!=='') {
      console.log(this.slimOptions.initialImage)
    }
  }
  // called when slim has initialized
slimInit(data:any, slim:any) {
  // slim instance reference
  console.log(slim);

  // current slim data object and slim reference
  console.log(data);
  this.imagetopass = data;
 
 
  
};

// called when upload button is pressed or automatically if push is enabled
slimService(formdata:any, progress:any, success:any, failure:any, slim:any) {
  // form data to post to server
  // set serviceFormat to "file" to receive an array of files
  console.log(formdata);

  // call these methods to handle upload state
  console.log(progress, success, failure);

  // reference to Slim instance
  console.log(slim);
};


uploadFile(event: any) {
  let reader = new FileReader(); // HTML5 FileReader API
  let file = event.target.files[0];
  if (event.target.files && event.target.files[0]) {
    reader.readAsDataURL(file);

    // When file uploads set it to file formcontrol
    reader.onload = () => {
      this.imageUrl = reader.result;
      this.registrationForm.patchValue({
        file: reader.result
      });
      var blob = new Blob(event.target.files, { type: event.target.files[0].type });
      // Create Blog URL 
      var url = window.URL.createObjectURL(blob);
      console.log('url' + url);
      console.log('sanitize' + this.sanitizer.bypassSecurityTrustUrl(url));
     this.sanitizeUrl = this.sanitizer.bypassSecurityTrustUrl(url);
      this.editFile = false;
      this.removeUpload = true;
      this.dropDownText = false;
      this.saveImage()
    }
    // ChangeDetectorRef since file is loading outside the zone
    this.cd.markForCheck();        
  }
}

// Function to remove uploaded file
// removeUploadedFile() {
//   // let newFileList = Array.from(this.el.nativeElement.files);
//   this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
//   this.editFile = true;
//   this.removeUpload = false;
//   this.registrationForm.patchValue({
//     file: [null]
//   });
// }

// Submit Registration Form
// onSubmit(): any {
//   this.submitted = true;
//   if(!this.registrationForm.valid) {
//     alert('Please fill all the required fields to create a super hero!')
//     return false;
//   } else {
//     console.log(this.registrationForm.value)
//   }
// }


saveImage() {
  let binaryblob: any;
  let reader = new FileReader();
  this.file = this.imagetopass.input.file;
  // this.loginUpload.uploadImage(this.file).subscribe((resu: any)=> {
  //   console.log('resu'+resu)
  // })
  reader.readAsDataURL(this.imagetopass.input.file);
    // When file uploads set it to file formcontrol
    reader.onload = () => {
      this.imageUrl = reader.result;
    console.log('imageurl 64' + this.imageUrl);

    let data= (this.imageUrl).split(',')[1];
     binaryblob = atob(data);
    console.log('encoded binary file' + binaryblob);
   
    // var blob = new Blob(this.imagetopass, { type: this.imagetopass.input.file.type });
    // var url = window.URL.createObjectURL(blob);
    console.log(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.imagetopass.input.file)))
    let bypassurl: any = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.imagetopass.input.file))
    let blob_auth = {
      'blob_url' : bypassurl.changingThisBreaksApplicationSecurity,
      'auth_token': this.authToken
    }
    this.loginUpload.uploadProfilePic(this.file,this.authToken).subscribe(
			(event: any) => {
				if (typeof (event) === 'object') {

					// Short link via api response
					this.shortLink = event.link;

					this.loading = false; // Flag variable
				}
			}
		);
    // this.loginUpload.profileImage(blob_auth).subscribe(res => {
    //   console.log('in save'+res)
    // })
    }
    // this.loginUpload.profileImage(this.sanitizeUrl,this.authToken).subscribe(res => {
    //   console.log('in save'+res)
    // })
   
    // if(this.imageUrl!== '') {
     
      // Create Blog URL 
      // var url = window.URL.createObjectURL(blob);
  
// }
}
}
