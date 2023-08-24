import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ClassSubjectResDto } from "@dto/class-subject/class-subject.res.dto";
import { AuthService } from "@services/auth.service";
import { ClassService } from "@services/class.service";
import { RoleCode } from "src/app/constant/role.contant";

@Component({
    selector: 'my-class',
    templateUrl: './myclass.component.html'
})
export class MyClassComponent implements OnInit {

    classes!: ClassSubjectResDto[]

    constructor(
        private classService: ClassService,
        private authService: AuthService,
        private title: Title
    ) {
        this.title.setTitle('My Classes | Learning Management System')
    }

    ngOnInit(): void {
        const profile = this.authService.getProfile()
        if (profile) {
            if (profile.roleCode === RoleCode.SISWA) {
                this.classService.getMyClass(profile.id)
                    .subscribe((res) => {
                        this.classes = res
                    })
            } else if (profile.roleCode === RoleCode.PENGAJAR) {
                this.classService.getByTeacher(profile.id)
                    .subscribe((res) => {
                        this.classes = res
                    })
            }

        }
    }
}