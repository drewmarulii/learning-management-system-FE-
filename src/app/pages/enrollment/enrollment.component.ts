import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ClassSubjectResDto } from "@dto/class-subject/class-subject.res.dto";
import { AuthService } from "@services/auth.service";
import { ClassService } from "@services/class.service";
import { EnrollmentService } from "@services/enrollment.service";

@Component({
    selector: 'enrollment',
    templateUrl: './enrollment.component.html'
})
export class EnrollmentComponent implements OnInit {

    classes!: ClassSubjectResDto[]
    classDetail?: ClassSubjectResDto
    imgUrl!: string
    studentName?: string

    enrollmentInsertReqDto = this.fb.group({
        classId : 0,
        studentId: 0,
    })

    constructor(
        private classService: ClassService,
        private enrollmentService: EnrollmentService,
        private authService: AuthService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private title: Title
    ) {
        this.title.setTitle('Unenrolled | Learning Management System')
    }

    ngOnInit(): void {
        this.unenrolledClasses
    }

    get unenrolledClasses() {
        const profile = this.authService.getProfile()
        if (profile) {
           return this.classService.getUnenrolledClass(profile.id)
                .subscribe((res) => {
                    this.classes = res
                })
        }
        return 0
    }

    onEnroll(id: number) {
        this.classService.getById(id)
            .subscribe((res) => {
                this.classDetail = res
                const profile = this.authService.getProfile()
                if (profile) {
                    this.enrollmentInsertReqDto.patchValue({
                        studentId: profile.id,
                        classId: this.classDetail.id
                    })

                    this.onCreate()
                }
            })
            
        this.studentName = this.authService.getProfile()?.userFullname
    }

    onCreate() {
        if (this.enrollmentInsertReqDto.valid) {
            const data = this.enrollmentInsertReqDto.getRawValue()
            this.enrollmentService.insertEnrollment(data).subscribe(res => {
                this.unenrolledClasses
                this.router.navigateByUrl('/enrollment')
            })
        }
    }
}