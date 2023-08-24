import { NgModule } from "@angular/core";
import { NavBarComponent } from "./navbar.component";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations : [
        NavBarComponent,
    ],
    imports : [
        RouterModule,
        CommonModule
    ],
    exports: [
        NavBarComponent,
        RouterModule
    ]
})
export class NavbarModule {

}