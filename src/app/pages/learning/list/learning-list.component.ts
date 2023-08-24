import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Params } from "@angular/router";
import { LearningResDto } from "@dto/learning/learning.res.dto";
import { AuthService } from "@services/auth.service";
import { LearningService } from "@services/learning.service";
import { Observable } from "rxjs";
import { RoleCode } from "src/app/constant/role.contant";

function getParams(activatedRoute : ActivatedRoute, parentLevel? : number) : Observable<Params> {
    let route = activatedRoute
    if(parentLevel) {
        for(let i=0; i<parentLevel; i++) {
            if(route.parent) {
                route = route.parent
            }
        }
    }
    return route.params
}
@Component({
    selector: 'learning-list',
    templateUrl: './learning-list.component.html'
})
export class LearningListComponent implements OnInit {

    class!: number
    roleCode? : string
    learnings!: LearningResDto[]

    constructor(
        private learningService: LearningService,
        private authService : AuthService,
        private route: ActivatedRoute,
        private title: Title
    ) {
        this.title.setTitle('Learning List | Learning Management System')
    }

    ngOnInit(): void {
        getParams(this.route, 0).subscribe((res) => {
            this.class = Number(res['id'])
            this.getClassLearning()
        })

        const profile = this.authService.getProfile()
        this.roleCode = profile?.roleCode
    }

    private getClassLearning() {
        this.learningService.getById(this.class)
            .subscribe((res) => {
                this.learnings = res
            })
    }

    get isLecturer() : boolean {
        return RoleCode.PENGAJAR === this.roleCode
    }

    get isStudent() : boolean {
        return RoleCode.SISWA === this.roleCode 
    }
}