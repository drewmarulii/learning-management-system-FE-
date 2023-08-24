import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnswerDetailComponent } from "./detail/answer-detail.component";
import { AnswerListComponent } from "./list/answer-list.component";

const routes: Routes = [
    {
        path: ':id/detail/:id',
        component: AnswerDetailComponent
    },
    {
        path: ':id',
        component: AnswerListComponent
    }
]

@NgModule({
    declarations : [
        AnswerDetailComponent,
        AnswerListComponent
    ],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        AnswerDetailComponent,
        AnswerListComponent,
        RouterModule
    ]
})
export class AnswerRouting {

}