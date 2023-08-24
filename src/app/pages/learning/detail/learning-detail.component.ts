import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Params, Route, Router } from "@angular/router";
import { ForumResDto } from "@dto/forum/forum.res.dto";
import { LearningMaterialResDto } from "@dto/learning-material/learning-material.res.dto";
import { LearningTaskResDto } from "@dto/learning-task/learning-task.res.dto";
import { LearningResDto } from "@dto/learning/learning.res.dto";
import { AttendanceService } from "@services/attendance.service";
import { AuthService } from "@services/auth.service";
import { ForumService } from "@services/forum.service";
import { LearningMaterialService } from "@services/learning-material.service";
import { LearningTaskService } from "@services/learning-task.service";
import { LearningService } from "@services/learning.service";
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
    selector: 'learning-detail',
    templateUrl: './learning-detail.component.html'
})
export class LearningDetailComponent implements OnInit {

    id!: number
    class!: number
    roleCode?: string
    studentId?: number
    learning?: LearningResDto
    materials!: LearningMaterialResDto[]
    tasks!: LearningTaskResDto[]
    forum?: ForumResDto
    forumId?: number

    attendanceInsertReqDto = this.fb.group({
        learningId: 0,
        studentId: 0,
    })

    forumInsertReqDto = this.fb.group({
        forumTitle : ['', [Validators.required]],
        forumDescription : ['', [Validators.required]],
        learningId : [0, [Validators.required]]
    })

    constructor(
        private learningService: LearningService,
        private forumService: ForumService,
        private learningMaterialService: LearningMaterialService,
        private learningTaskService: LearningTaskService,
        private authService: AuthService,
        private attendanceService: AttendanceService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: NonNullableFormBuilder,
        private title: Title
    ) {
        this.title.setTitle('Learning Detail | Learning Management System')
    }

    ngOnInit(): void {
        getParams(this.route, 0).subscribe((res) => {
            this.class = Number(res['classId'])
            this.id = Number(res['id'])
        })

        const profile = this.authService.getProfile()
        this.roleCode = profile?.roleCode
        this.studentId = profile?.id

        this.learningDetail()
    }

    get learningDetail() {
        return this.detail
    }

    detail() {
        this.learningService.getByLearning(this.id).subscribe((res) => {
            this.learning = res
        })

        this.learningMaterialService.getByLearning(this.id).subscribe((res) => {
            this.materials = res
        })

        this.learningTaskService.getByLearning(this.id).subscribe((res) => {
            this.tasks = res
        })

        this.attendanceInsertReqDto.patchValue({
            learningId: this.id,
            studentId: this.studentId
        })
    }

    get isLecturer(): boolean {
        return RoleCode.PENGAJAR === this.roleCode
    }

    get isStudent(): boolean {
        return RoleCode.SISWA === this.roleCode
    }

    onAttend() {
        if (this.attendanceInsertReqDto.valid) {
            const data = this.attendanceInsertReqDto.getRawValue()
            this.attendanceService.insertAttendance(data).subscribe(res => {
                this.learningDetail()
                this.router.navigateByUrl(`/myclass/${this.class}/learning/detail/${this.id}`)
            })
        }
    }

    onClick() {
        this.forumInsertReqDto.patchValue({
            learningId: this.id
        })
    }

    onCreateForum() {
        if (this.forumInsertReqDto.valid) {
            const data = this.forumInsertReqDto.getRawValue()
            this.forumService.insertForum(data).subscribe(res => {
                this.learningDetail()
                this.router.navigateByUrl(`/myclass/${this.class}/learning/detail/${this.id}`)
            })
        }
    }
}