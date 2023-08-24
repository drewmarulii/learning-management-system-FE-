import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EnrollmentComponent } from "./enrollment.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
    {
        path: '',
        component: EnrollmentComponent
    }
]

@NgModule({
    declarations : [
        EnrollmentComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule, 
        ReactiveFormsModule
    ],
    exports: [
        EnrollmentComponent,
        RouterModule
    ]
})
export class EnrollmentRouting {

}