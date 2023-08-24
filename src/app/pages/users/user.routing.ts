import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserListComponent } from "./list/user-list.component";
import { UserCreateComponent } from "./create/user-create.component";
import { UserProfileComponent } from "./profile/user-profile.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { UserUpdateComponent } from "./update/user-update.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
    {
        path: '',
        component: UserListComponent
    },
    {
        path: 'new',
        component: UserCreateComponent
    },
    {
        path: 'profile',
        component: UserProfileComponent
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent
    },
    {
        path: 'profile/update/:id',
        component: UserUpdateComponent
    }
]

@NgModule({
    declarations : [
        UserListComponent,
        UserCreateComponent,
        UserProfileComponent,
        UserUpdateComponent,
        ChangePasswordComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        UserListComponent,
        UserCreateComponent,
        UserProfileComponent,
        UserUpdateComponent,
        ChangePasswordComponent,
        RouterModule
    ]
})

export class UserRouting {

}