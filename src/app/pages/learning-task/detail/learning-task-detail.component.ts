import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Params } from "@angular/router";
import { LearningTaskResDto } from "@dto/learning-task/learning-task.res.dto";
import { QuestionResDto } from "@dto/question/question.res.dto";
import { AuthService } from "@services/auth.service";
import { LearningTaskService } from "@services/learning-task.service";
import { Observable } from "rxjs";
import { RoleCode } from "src/app/constant/role.contant";

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
    selector: 'learning-task-detail',
    templateUrl: './learning-task-detail.component.html'
})
export class LearningTaskDetailComponent implements OnInit {

    roleCode!: string
    classId!: number
    learningId!: number
    taskId!: number
    task?: LearningTaskResDto
    questions!: QuestionResDto[]

    constructor(
        private learningTaskService: LearningTaskService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private title: Title
    ) {
        this.title.setTitle('Task | Learning Management System')
    }

    ngOnInit(): void {
        getParams(this.route, 0).subscribe((res) => {
            this.classId = Number(res['classId'])
            this.learningId = Number(res['learningId'])
            this.taskId = Number(res['id'])
        })

        this.learningTaskService.getById(this.taskId).subscribe((res) => {
            this.task = res
        })

        this.learningTaskService.getQuestionByTask(this.taskId).subscribe((res) => {
            this.questions = res
        })

        const profile = this.authService.getProfile()
        if (profile) {
            this.roleCode = profile.roleCode
        }
    }

    get isLecturer() {
        return RoleCode.PENGAJAR === this.roleCode
    }

    get isStudent() {
        return RoleCode.SISWA === this.roleCode
    }
}