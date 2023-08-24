import { Component } from "@angular/core";
import { AuthService } from "@services/auth.service";
import { Router } from "@angular/router";
import { RoleCode } from "src/app/constant/role.contant";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})

export class NavBarComponent {
    imgUrl! : number
    roleCode! : string
    
    constructor(
        private authService  : AuthService,
        private router : Router
        ) { }

    ngOnInit() : void {
        const profile = this.authService.getProfile()
        if(profile) {
            this.imgUrl = profile.photoId
            this.roleCode = profile.roleCode
        }
    }

    get isAdmin() : boolean {
        return RoleCode.ADMIN === this.roleCode
    }

    get isStudent() : boolean {
        return RoleCode.SISWA === this.roleCode 
    }

    get isLecturer() : boolean {
        return RoleCode.PENGAJAR === this.roleCode
    }

    get isStudentLecturer() : boolean {
        if (this.isStudent || this.isLecturer) {
            return true
        }

        return false
    }

    onLogout() : void {
        localStorage.clear()
        this.router.navigateByUrl('/login')
    }
}