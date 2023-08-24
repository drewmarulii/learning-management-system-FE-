import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LearningMaterialCreateComponent } from "./create/learning-material.create.component";
import { LearningMaterialDetailComponent } from "./detail/learning-material-detail.component";
import { LearningMaterialUpdateComponent } from "./update/learning-material-update.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
    {
        path: 'detail/:id',
        component: LearningMaterialDetailComponent
    },
    {
        path: 'new',
        component: LearningMaterialCreateComponent
    },
    {
        path: 'update/:id',
        component: LearningMaterialUpdateComponent
    }
]

@NgModule({
    declarations : [
        LearningMaterialCreateComponent,
        LearningMaterialDetailComponent,
        LearningMaterialUpdateComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        LearningMaterialCreateComponent,
        LearningMaterialDetailComponent,
        LearningMaterialUpdateComponent,
        RouterModule
    ]
})
export class LearningMaterialRouting {

}