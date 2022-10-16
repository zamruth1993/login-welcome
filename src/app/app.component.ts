import { Component } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'welcome-profile';

  slimOptions = {
    ratio: '1:1',
    download: true,
    initialImage: '',
    service: this.slimService.bind(this),
    didInit: this.slimInit.bind(this)
};
selectedFiles: any;
previews: string[] = [];
limitMessage: string = '';
numberExceeded: boolean = false;
constructor(public sanitizer: DomSanitizer) {}

ngOnInit() {
  this.slimOptions.initialImage='';
}

// called when slim has initialized
slimInit(data:any, slim:any) {
    // slim instance reference
    console.log(slim);

    // current slim data object and slim reference
    console.log(data);
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


selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
          console.log('previews' + this.previews)
          var blob = new Blob(event.target.files, { type: this.selectedFiles[i].type });
          // Create Blog URL 
          var url = window.URL.createObjectURL(blob);
          console.log('url' + url)
          console.log(this.sanitizer.bypassSecurityTrustUrl(url));
           
        };
        reader.readAsDataURL(this.selectedFiles[i]);
       
      }
    }

}
}
