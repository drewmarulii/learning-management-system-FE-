import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserModule } from "./pages/users/user.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./components/login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { BaseModule } from "./components/base/base.module";
import { BaseComponent } from "./components/base/base.component";
import { RegisterComponent } from "./pages/registration/register.component";
import { MyClassModule } from "./pages/myclass/myclass.module";
import { LearningMaterialModule } from "./pages/learning-material/learning-material.module";
import { LearningModule } from "./pages/learning/learning.module";
import { ForumModule } from "./pages/forum/forum.module";
import { EnrollmentModule } from "./pages/enrollment/enrollment.module";
import { ClassModule } from "./pages/class-subject/class-subject.module";
import { AttendanceModule } from "./pages/attendance/attendance.module";
import { AnswerModule } from "./pages/answer/answer.module";
import { LearningTaskModule } from "./pages/learning-task/learning-task.module";
import { RegisterModule } from "./pages/registration/register.module";
import { NotFoundComponent } from "./components/not-found/not-found.component";

const routes : Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        component: BaseComponent,
        path: 'dashboard',
        children: [{
            path: '',
            component: DashboardComponent
        }]
    },
    {
        path: 'register',
        loadChildren: () => import('./pages/registration/register.module').then(r => RegisterModule)
    },
    {
        component: BaseComponent,
        path: 'users',
        loadChildren: () => import('./pages/users/user.module').then(u => UserModule)
    },
    {
        component: BaseComponent,
        path: 'myclass',
        loadChildren: () => import('./pages/myclass/myclass.module').then(mc => MyClassModule)
    },
    {
        component: BaseComponent,
        path: 'learning-task',
        loadChildren: () => import('./pages/learning-task/learning-task.module').then(lt => LearningTaskModule)
    },
    {
        component: BaseComponent,
        path: 'learning-material',
        loadChildren: () => import('./pages/learning-material/learning-material.module').then(lm => LearningMaterialModule)
    },
    {
        component: BaseComponent,
        path: 'learning',
        loadChildren: () => import('./pages/learning/learning.module').then(l => LearningModule)
    },
    {
        component: BaseComponent,
        path: 'forum',
        loadChildren: () => import('./pages/forum/forum.module').then(f => ForumModule)
    },
    {
        component: BaseComponent,
        path: 'enrollment',
        loadChildren: () => import('./pages/enrollment/enrollment.module').then(m => EnrollmentModule)
    },
    {
        component: BaseComponent,
        path: 'class',
        loadChildren: () => import('./pages/class-subject/class-subject.module').then(c => ClassModule)
    },
    {
        component: BaseComponent,
        path: 'attendance',
        loadChildren: () => import('./pages/attendance/attendance.module').then(a => AttendanceModule)
    },
    {
        component: BaseComponent,
        path: 'answer',
        loadChildren: () => import('./pages/answer/answer.module').then(aw => AnswerModule)
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: "full"
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]

@NgModule({
    declarations : [
        DashboardComponent,
        LoginComponent
    ],
    imports : [
        RouterModule.forRoot(routes), 
        BaseModule,       
        ReactiveFormsModule,
        CommonModule
    ],
    exports : [
        RouterModule
    ]
})
export class AppRouting {

}