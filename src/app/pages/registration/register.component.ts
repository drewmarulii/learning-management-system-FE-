import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { RegistrationService } from "@services/registration.service";

@Component({
    selector: 'register',
    templateUrl: 'register.component.html'
})
export class RegisterComponent {

    studentRegistrationReqDto = this.fb.group({
        userEmail: ['', [Validators.required]],
        userFullName: ['', [Validators.required]],
        userGender: ['', [Validators.required]],
        userAddress: ['', [Validators.required]],
        file: ['', [Validators.required]],
        fileExtension: ['', [Validators.required]]
    })

    constructor(
        private registrationService: RegistrationService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private title: Title
    ) {
        this.title.setTitle('Student Registration | Learning Management System')
    }

    onCreate(): void {
        if (this.studentRegistrationReqDto.valid) {
            const data = this.studentRegistrationReqDto.getRawValue()
            this.registrationService.insertStudent(data).subscribe(result => {
                this.router.navigateByUrl('/login')
            })
        }
    }

    fileUpload(event: any) {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            };
            reader.onerror = error => reject(error);
        });

        for (let file of event.target.files) {
            toBase64(file).then(result => {
                const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
                const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)

                this.studentRegistrationReqDto.patchValue({
                    file: resultBase64,
                    fileExtension: resultExtension
                })

                console.log(resultBase64)
                console.log(resultExtension)
            })
        }
    }
}