import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AttendanceComponent } from "./attendance.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
    {
        path: '',
        component: AttendanceComponent
    }
]

@NgModule({
    declarations : [
        AttendanceComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        AttendanceComponent,
        RouterModule
    ]
})
export class AttendanceRouting {

}