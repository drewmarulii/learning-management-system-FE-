import { Component, OnInit } from "@angular/core";
import { AuthService } from "@services/auth.service";
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {

    fullName!: string

    constructor(
        private authService: AuthService,

        private title: Title) {
        this.title.setTitle('Dashboard | Learning Management System')
    }

    ngOnInit(): void {
        const profile = this.authService.getProfile()
        if (profile) {
            this.fullName = profile.userFullname
        }
    }
}

