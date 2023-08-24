import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { UserRoleResDto } from "@dto/users/user-role.res.dto";
import { RoleService } from "@services/role.service";
import { UserService } from "@services/user.service";

@Component({
    selector: 'user-create',
    templateUrl: './user-create.component.html'
})
export class UserCreateComponent implements OnInit {

    roles!: UserRoleResDto[]

    userInsertReqDto = this.fb.group({
        userEmail: ['', [Validators.required]],
        roleId: [0, [Validators.required]],
        userFullName: ['', [Validators.required]],
        userGender: ['', [Validators.required]],
        userAddress: ['', [Validators.required]],
        file: ['', [Validators.required]],
        fileExtension: ['', [Validators.required]]
    })

    constructor(
        private userService: UserService,
        private roleService: RoleService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private title: Title) {
        this.title.setTitle('Create User | Learning Management System')
    }

    ngOnInit(): void {
        this.roleService.getAllRoles()
            .subscribe((res) => {
                this.roles = res
            })
    }

    onCreate(): void {
        if (this.userInsertReqDto.valid) {
            const data = this.userInsertReqDto.getRawValue()
            this.userService.insertUser(data).subscribe(result => {
                this.router.navigateByUrl('/users')
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

                this.userInsertReqDto.patchValue({
                    file: resultBase64,
                    fileExtension: resultExtension
                })

                console.log(resultBase64)
                console.log(resultExtension)
            })
        }
    }
}