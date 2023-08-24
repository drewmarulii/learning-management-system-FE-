import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LearningCreateComponent } from "./create/learning-create.component";
import { LearningUpdateComponent } from "./update/learning-update.component";
import { LearningListComponent } from "./list/learning-list.component";
import { LearningDetailComponent } from "./detail/learning-detail.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
    
]

@NgModule({
    declarations : [
        LearningCreateComponent,
        LearningUpdateComponent,
        LearningListComponent,
        LearningDetailComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        LearningCreateComponent,
        LearningUpdateComponent,
        LearningListComponent,
        LearningDetailComponent,
        RouterModule
    ]
})
export class LearningRouting {

}