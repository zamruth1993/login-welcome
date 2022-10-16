import { Component, OnInit } from '@angular/core';
import { LoginUploadServiceService } from '../services/login-upload-service.service';

@Component({
	selector: 'app-file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

	// Variable to store shortLink from api response
	shortLink: string = "";
	loading: boolean = false; // Flag variable
	file: File | undefined; // Variable to store file

	// Inject service
	constructor(private loginService: LoginUploadServiceService) { }

	ngOnInit(): void {
	}
	// On file Select
	onChange(event: any ) {
		this.file = event.target.files[0];
	}

	// OnClick of button Upload
	onUpload() {
		this.loading = !this.loading;
		console.log(this.file);
		this.loginService.upload(this.file).subscribe(
			(event: any) => {
				if (typeof (event) === 'object') {

					// Short link via api response
					this.shortLink = event.link;

					this.loading = false; // Flag variable
				}
			}
		);
	}
}
