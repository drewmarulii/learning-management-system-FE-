import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyClassComponent } from "./myclass.component";
import { CommonModule } from "@angular/common";
import { LearningListComponent } from "../learning/list/learning-list.component";
import { LearningCreateComponent } from "../learning/create/learning-create.component";
import { LearningDetailComponent } from "../learning/detail/learning-detail.component";
import { LearningMaterialCreateComponent } from "../learning-material/create/learning-material.create.component";
import { LearningMaterialDetailComponent } from "../learning-material/detail/learning-material-detail.component";
import { LearningUpdateComponent } from "../learning/update/learning-update.component";
import { LearningMaterialUpdateComponent } from "../learning-material/update/learning-material-update.component";
import { AttendanceComponent } from "../attendance/attendance.component";
import { LearningTaskCreateComponent } from "../learning-task/create/learning-task-create.component";
import { LearningTaskDetailComponent } from "../learning-task/detail/learning-task-detail.component";
import { ForumComponent } from "../forum/forum.component";

const routes: Routes = [
    {
        path: '',
        component: MyClassComponent
    },
    {
        path: ':id/learning',
        component: LearningListComponent
    },
    {
        path: ':id/learning/new',
        component: LearningCreateComponent
    },
    {
        path: ':classId/learning/detail/:id',
        component: LearningDetailComponent
    },
    {
        path: ':classId/learning/detail/:id/material/new',
        component: LearningMaterialCreateComponent
    },
    {
        path: ':classId/learning/detail/:learningId/material/:id',
        component: LearningMaterialDetailComponent
    },
    {
        path: ':classId/learning/detail/:learningId/material/:id/update',
        component: LearningMaterialUpdateComponent
    },
    {
        path: ':classId/learning/detail/:learningId/attendance',
        component: AttendanceComponent
    },
    {
        path: ':classId/learning/detail/:id/task/new',
        component: LearningTaskCreateComponent
    },
    {
        path: ':classId/learning/detail/:learningId/forum',
        component: ForumComponent
    },
    {
        path: ':classId/learning/detail/:learningId/task/:id',
        component: LearningTaskDetailComponent
    }
]

@NgModule({
    declarations : [
        MyClassComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ],
    exports: [
        MyClassComponent,
        RouterModule
    ]
})
export class MyClassRouting {

}