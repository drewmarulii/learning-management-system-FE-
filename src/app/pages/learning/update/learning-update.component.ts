import { Component } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { LearningMaterialResDto } from "@dto/learning-material/learning-material.res.dto";
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
    selector: 'learning-update',
    templateUrl: './learning-update.component.html'
})
export class LearningUpdateComponent {
    classId!: number
    learningId!: number
    materialId!: number
    material?: LearningMaterialResDto

    constructor(
        private learningMaterialService: LearningMaterialService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private title: Title
    ) {
        this.title.setTitle('Update Material | Learning Management System')
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