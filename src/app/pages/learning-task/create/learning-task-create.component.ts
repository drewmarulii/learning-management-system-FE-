import { Component, OnInit } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AttachmentQuestionInsertReqDto } from "@dto/question/attachment-question-insert.req.dto";
import { QuestionInsertReqDto } from "@dto/question/question-insert.req.dto";
import { AuthService } from "@services/auth.service";
import { LearningTaskService } from "@services/learning-task.service";
import { Observable } from "rxjs";

function getParams(activatedRoute: ActivatedRoute, parentLevel?: number): Observable<Params> {
    let route = activatedRoute
    if (parentLevel) {
        for (let i = 0; i < parentLevel; i++) {
            if (route.parent) {
                route = route.parent
            }
        }
    }
    return route.params
}
@Component({
    selector: 'learning-task-create',
    templateUrl: './learning-task-create.component.html'
})
export class LearningTaskCreateComponent implements OnInit {

    classId!: number
    learningId!: number
    question : QuestionInsertReqDto[] = []
    file : AttachmentQuestionInsertReqDto[] = []

    learningTaskInsertReqDto = this.fb.group({
        learningId : [0, [Validators.required]],
        startDateTime : ['', [Validators.required]],
        endDateTime : ['', [Validators.required]],
        questions: this.fb.array(this.question)
    })

    constructor( 
        private learningTaskService : LearningTaskService,
        private authService : AuthService,
        private route : ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private router : Router,
        private title : Title
    ) {
        this.title.setTitle('Create Task | Learning Management System')
    }

    ngOnInit(): void {
        getParams(this.route, 0).subscribe((res) => {
            this.classId = Number(res['classId'])
            this.learningId = Number(res['id'])
            console.log(this.classId)
            console.log(this.learningId)
        })

        this.learningTaskInsertReqDto.patchValue({
            learningId: this.learningId
        })
    }

    onCreate(): void {
        if (this.learningTaskInsertReqDto.valid) {
            const data = this.learningTaskInsertReqDto.getRawValue()
            this.learningTaskService.insertTask(data).subscribe(result => {
                this.router.navigateByUrl(`/myclass/${this.classId}/learning/detail/${this.learningId}`)
            })
        }
    }

    get questions() {
        return this.learningTaskInsertReqDto.get('questions') as FormArray
    }

    onAdd() {
        this.questions.push(this.fb.group({
            questionDetail : ['', [Validators.required]],
            typeId : [0, [Validators.required]],
            files : this.fb.array(this.file)
        }))
    }

    onDelete(i : number) {
        this.questions.removeAt(i)
    }
}