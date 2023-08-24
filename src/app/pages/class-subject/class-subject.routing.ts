import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClassListComponent } from "./list/class-subject-list.component";
import { ClassCreateComponent } from "./create/class-subject-create.component";
import { ClassUpdateComponent } from "./update/class-subject-update.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
    {
        path: '',
        component: ClassListComponent
    },
    {
        path: 'new',
        component: ClassCreateComponent
    },
    {
        path: 'update/:id',
        component: ClassUpdateComponent
    }
]

@NgModule({
    declarations : [
        ClassListComponent,
        ClassCreateComponent,
        ClassUpdateComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        ClassListComponent,
        ClassCreateComponent,
        ClassUpdateComponent,
        RouterModule
    ]
})
export class ClassRouting {

}