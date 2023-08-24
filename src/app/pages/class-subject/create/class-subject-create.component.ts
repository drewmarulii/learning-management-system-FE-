import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { UserListResDto } from "@dto/users/user-list.res.dto";
import { ClassService } from "@services/class.service";
import { UserService } from "@services/user.service";
import { RoleCode } from "src/app/constant/role.contant";

@Component({
    selector: 'class-subject-create',
    templateUrl: './class-subject-create.component.html'
})
export class ClassCreateComponent implements OnInit {

    teachers!: UserListResDto[]

    classInsertReqDto = this.fb.group({
        className: ['', [Validators.required]], 
        file: ['', [Validators.required]], 
        fileExtension: ['', [Validators.required]], 
        teacherId: [0, [Validators.required]]
    })

    constructor(
        private userService: UserService,
        private classService: ClassService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private title: Title
    ) {
        this.title.setTitle('Create Class | Learning Management System')
    }

    ngOnInit(): void {
        this.userService.getByRoleCode(RoleCode.PENGAJAR)
            .subscribe((res) => {
                this.teachers = res
            })
    }

    onCreate(): void {
        if (this.classInsertReqDto.valid) {
            const data = this.classInsertReqDto.getRawValue()
            this.classService.insertClass(data).subscribe(result => {
                this.router.navigateByUrl('/class')
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

                this.classInsertReqDto.patchValue({
                    file: resultBase64,
                    fileExtension: resultExtension
                })

                console.log(resultBase64)
                console.log(resultExtension)
            })
        }
    }
}