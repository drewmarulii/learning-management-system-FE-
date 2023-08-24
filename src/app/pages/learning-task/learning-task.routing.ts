import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LearningTaskDetailComponent } from "./detail/learning-task-detail.component";
import { LearningTaskCreateComponent } from "./create/learning-task-create.component";
import { LearningTaskUpdateComponent } from "./update/learning-task-update.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
    {
        path: 'detail/:id',
        component: LearningTaskDetailComponent 
    },
    {
        path: 'create',
        component: LearningTaskCreateComponent 
    },
    {
        path: 'update/:id',
        component: LearningTaskUpdateComponent
    }
]

@NgModule({
    declarations : [
        LearningTaskDetailComponent,
        LearningTaskCreateComponent,
        LearningTaskUpdateComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        LearningTaskDetailComponent,
        LearningTaskCreateComponent,
        LearningTaskUpdateComponent,
        RouterModule
    ]
})
export class LearningTaskRouting {

}