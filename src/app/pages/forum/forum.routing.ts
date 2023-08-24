import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForumComponent } from "./forum.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
    {
        path: '',
        component: ForumComponent
    }
]

@NgModule({
    declarations : [
        ForumComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        ForumComponent,
        RouterModule
    ]
})
export class ForumRouting {

}