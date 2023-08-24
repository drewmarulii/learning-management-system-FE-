import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Params } from "@angular/router";
import { LearningMaterialResDto } from "@dto/learning-material/learning-material.res.dto";
import { AuthService } from "@services/auth.service";
import { LearningMaterialService } from "@services/learning-material.service";
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
    selector: 'learning-material-detail',
    templateUrl: './learning-material-detail.component.html'
})
export class LearningMaterialDetailComponent implements OnInit {

    classId!: number
    learningId!: number
    materialId!: number
    material?: LearningMaterialResDto

    constructor(
        private learningMaterialService: LearningMaterialService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private title: Title
    ) {
        this.title.setTitle('Material Detail | Learning Management System')
    }

    ngOnInit(): void {
        getParams(this.route, 0).subscribe((res) => {
            this.classId = Number(res['classId'])
            this.learningId = Number(res['learningId'])
            this.materialId = Number(res['id'])
            console.log(this.classId)
            console.log(this.learningId)
            console.log(this.materialId)
        })

        this.learningMaterialService.getById(this.materialId).subscribe((res) => {
            this.material = res
        })

    }
}