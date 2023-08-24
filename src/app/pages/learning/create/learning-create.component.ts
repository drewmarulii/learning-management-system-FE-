import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { ClassSubjectResDto } from "@dto/class-subject/class-subject.res.dto";
import { AuthService } from "@services/auth.service";
import { ClassService } from "@services/class.service";
import { LearningService } from "@services/learning.service";

@Component({
    selector: 'learning-create',
    templateUrl: './learning-create.component.html'
})
export class LearningCreateComponent implements OnInit {

    id!: number
    classes! : ClassSubjectResDto[]

    learningInsertReqDto = this.fb.group({
        learningTopic: ['', [Validators.required]],
        learningDate: ['', [Validators.required]],
        classId: [0, [Validators.required]]
    })

    constructor(
        private learningService: LearningService,
        private authService: AuthService,
        private classService: ClassService,
        private route: ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private title: Title
    ) {
        this.title.setTitle('Create Learning | Learning Management Sytem')
    }

    ngOnInit(): void {
        this.route.params.subscribe(result => {
            const classId = result['id']
            if (classId) {
                this.id = Number(classId)
            }

            this.learningInsertReqDto.patchValue({
                classId:this.id
            })
        })

        const profile = this.authService.getProfile()
        if(profile) {
            this.classService.getByTeacher(profile.id).subscribe((res) => {
                this.classes = res
            })
        }
    }

    onCreate(): void {
        if (this.learningInsertReqDto.valid) {
            const data = this.learningInsertReqDto.getRawValue()
            this.learningService.insertLearning(data).subscribe(result => {
                this.router.navigateByUrl(`/myclass/${this.id}/learning`)
            })
        }
    }
}